from django.db import models
import datetime
ahora = datetime.datetime.now

# Create your models here.
# ==============================================================================
# 1. MODELOS BASE (USUARIO y ROLES)
# Usamos herencia de modelos (OneToOneField) para los roles especializados
# ya que todos tienen la misma PK (id_usuario).
# ==============================================================================

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True, max_length=100)
    contrasena = models.CharField(max_length=128)
    rol = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
    
class Estudiante(models.Model):
    id_usuario = models.OneToOneField(
        Usuario, 
        on_delete=models.CASCADE, 
        primary_key=True)
    rut = models.CharField(max_length=12, unique=True)
    carrera = models.CharField(max_length=100)
    estado_caso = models.CharField(max_length=50)
    fecha_matricula = models.DateField(default=ahora)

    def __str__(self):
        return f"Estudiante: {self.id_usuario.nombre}, RUT: {self.rut}"
    
class Asesor(models.Model):
    # id_usuario (PK, FK)
    id_usuario = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        primary_key=True
    )
    especialidad = models.CharField(max_length=100)
    telefono_contacto = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Asesor: {self.usuario.nombre}"
    
class Docente(models.Model):
    # id_usuario (PK, FK)
    id_usuario = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        primary_key=True
    )
    observaciones = models.TextField(blank=True, null=True)
    fecha_seguimiento = models.DateField(blank=True, null=True)
    cumplimiento = models.BooleanField(default=False)

    def __str__(self):
        return f"Docente: {self.usuario.nombre}"
    
class Director(models.Model):
    # id_director (PK) (Dado que tiene una FK a Director en AJUSTE y NOTIFICACION, creamos una PK separada)
    id_director = models.AutoField(primary_key=True)
    id_usuario = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name='director_profile'
    )
    comentarios = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Director: {self.id_usuario.nombre}"
    

# ==============================================================================
# 2. MODELOS CENTRALES
# ==============================================================================

class Notificacion(models.Model):
    # id (PK) automático
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE) # FK a Usuario
    tipo = models.CharField(max_length=50)
    mensaje = models.TextField(default="Texto de notificación")
    fecha_envio = models.DateTimeField(default=ahora)

    def __str__(self):
        return f"Notificación para {self.id_usuario.nombre}: {self.tipo}"
    
class Asignatura(models.Model):
    # id_asignatura (PK)
    id_asignatura = models.AutoField(primary_key=True)
    nombre_asignatura = models.CharField(max_length=200)
    id_usuario_docente = models.ForeignKey(Docente, on_delete=models.SET_NULL, null=True, related_name='asignaturas_impartidas')

    def __str__(self):
        return self.nombre_asignatura

# ==============================================================================
# 3. MODELOS DE PROCESO
# ==============================================================================

class Caso(models.Model):
    # id_diagnostico (PK)
    id_diagnostico = models.AutoField(primary_key=True)
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='casos_estudiante')
    id_usuario_asesor = models.ForeignKey(Asesor, on_delete=models.SET_NULL, null=True, related_name='casos_asesor')
    id_asignatura = models.ForeignKey(Asignatura, on_delete=models.SET_NULL, null=True, related_name='casos_asignatura')
    estado_caso = models.CharField(max_length=50)
    evaluacion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Caso {self.id_diagnostico} de {self.id_usuario_estudiante.usuario.nombre}"
    
class Entrevista(models.Model):
    # id_entrevista (PK)
    id_entrevista = models.AutoField(primary_key=True)
    id_usuario_asesor = models.ForeignKey(Asesor, on_delete=models.SET_NULL, null=True, related_name='entrevistas_realizadas')
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='entrevistas_recibidas')
    fecha_entrevista = models.DateTimeField()
    observaciones = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"Entrevista {self.id_entrevista} el {self.fecha_entrevista.date()}"
    
class Documento(models.Model):
    # id_documento (PK)
    id_documento = models.AutoField(primary_key=True)
    id_caso = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name='documentos')
    tipo = models.CharField(max_length=100)
    url_archivo = models.URLField() # Usamos URLField para guardar la ruta del archivo
    fecha_subida = models.DateField(default=ahora)

    def __str__(self):
        return f"Documento: {self.tipo} del caso {self.id_caso.id_diagnostico}"
    
class Inscripcion(models.Model):
    # (PK Compuesta: id_asignatura, id_usuario_estudiante) -> Django necesita una PK simple.
    # Usaremos AutoField y agregaremos una restricción unique_together en Meta.
    id = models.AutoField(primary_key=True)
    id_asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)

    class Meta:
        # Asegura que un estudiante solo se pueda inscribir una vez a una asignatura.
        unique_together = ('id_asignatura', 'id_usuario_estudiante')

    def __str__(self):
        return f"Inscripción: {self.id_usuario_estudiante.usuario.nombre} en {self.id_asignatura.nombre_asignatura}"
    
class Ajuste(models.Model):
    # id_ajuste (PK)
    id_ajuste = models.AutoField(primary_key=True)
    id_caso = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name='ajustes')
    id_usuario_director = models.ForeignKey(Director, on_delete=models.SET_NULL, null=True, related_name='ajustes_aprobados')
    tipo_ajuste = models.CharField(max_length=100)
    descripcion = models.TextField()
    estado = models.CharField(max_length=50)
    fecha_aprobacion = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Ajuste {self.id_ajuste} - {self.tipo_ajuste}"

class TipoAjuste(models.Model):
    # id_tipo_ajuste (PK)
    id_tipo_ajuste = models.AutoField(primary_key=True)
    nombre_tipo = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_tipo

