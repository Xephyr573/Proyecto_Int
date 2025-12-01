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
    # id_usuario (PK)
    id_usuario = models.AutoField(primary_key=True)
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
    carrera = models.CharField(max_length=100, blank=True)
    cede = models.CharField(max_length=100, blank=True)
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
    ESPECIALIDAD_ASESOR_CHOICES = [ # Opciones para la especialidad del asesor
        ('Pedagogico', 'Asesor Pedagogico'),
        ('CTP', 'Asesor CTP'),
    ]
    especialidad = models.CharField(max_length=25, choices=ESPECIALIDAD_ASESOR_CHOICES, default='CTP') #choices para limitar a Pedagogico o CTP
    telefono_contacto = models.CharField(max_length=20, blank=True)
    area_asignada = models.CharField(max_length=100, 
                                     blank=True, 
                                     help_text="Area de carrera asignada para Asesores CTP")

    def __str__(self):
        return f"Asesor: {self.id_usuario.nombre}"
    
class Docente(models.Model):
    # id_usuario (PK, FK)
    id_usuario = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        primary_key=True
    )
    observaciones = models.TextField(blank=True)
    fecha_seguimiento = models.DateField(blank=True, null=True)
    cumplimiento = models.BooleanField(default=False)

    def __str__(self):
        return f"Docente: {self.id_usuario.nombre}"
    
class Director(models.Model):
    # id_director (PK) (Dado que tiene una FK a Director en AJUSTE y NOTIFICACION, creamos una PK separada)
    id_director = models.AutoField(primary_key=True)
    id_usuario = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
        related_name='director_profile'
    )
    comentarios = models.TextField(blank=True)

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
    # id_caso (PK)
    id_caso = models.AutoField(primary_key=True)
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, related_name='casos_estudiante')
    id_usuario_asesor = models.ForeignKey(Asesor, on_delete=models.SET_NULL, null=True, related_name='casos_asesor')
    estado_caso = models.CharField(max_length=50) # Ejemplo: Iniciado, En evaluacion, Finalizado
    fecha_ingreso_caso = models.DateField(default=ahora)
    semestre = models.CharField(max_length=8, blank=True) # Ejemplo: 2024-1

    def __str__(self):
        return f"Caso {self.id_caso} de {self.id_usuario_estudiante.id_usuario.nombre}"
    
class MotivoCaso(models.Model):
    # id_motivo (PK)
    id_motivo = models.AutoField(primary_key=True)
    id_caso = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name='motivos_caso')
    motivo = models.CharField(max_length=200)
    origen = models.CharField(max_length=100)
    detalle = models.TextField()

    def __str__(self):
        return f"Motivo {self.id_motivo} del caso {self.id_caso.id_caso}"
    
class Entrevista(models.Model):
    # id_entrevista (PK)
    id_entrevista = models.AutoField(primary_key=True)
    id_usuario_asesor = models.ForeignKey(Asesor, on_delete=models.SET_NULL, null=True, related_name='entrevistas_realizadas')
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, related_name='entrevistas_recibidas')
    fecha_entrevista = models.DateTimeField()
    observaciones = models.TextField(blank=True)
    estado = models.CharField(max_length=50)

    def __str__(self):
        return f"Entrevista {self.id_entrevista} el {self.fecha_entrevista.date()}"
    
class TipoAjuste(models.Model):
    # id_tipo_ajuste (PK)
    id_tipo_ajuste = models.AutoField(primary_key=True)
    nombre_tipo = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_tipo

class Ajuste(models.Model):
    # id_ajuste (PK)
    id_ajuste = models.AutoField(primary_key=True)
    id_caso = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name='ajustes')
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, related_name='ajustes_estudiante')
    id_usuario_director = models.ForeignKey(Director, on_delete=models.SET_NULL, null=True, blank=True, related_name='ajustes_aprobados')
    asignatura_asignada = models.ForeignKey(Asignatura, on_delete=models.CASCADE, blank=True, null=True)
    titulo_ajuste = models.CharField(max_length=200, blank=True) #Aqui va el nombre del ajuste, en caso de 'Otro' queda con ese mismo titulo
    tipo_ajuste = models.ForeignKey(TipoAjuste, on_delete=models.CASCADE)
    descripcion = models.TextField()
    estado_ajuste = models.CharField(max_length=50) # Ejemplo: Pendiente, Aprobado, Rechazado
    fecha_aprobacion = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Ajuste {self.id_ajuste} - {self.tipo_ajuste}"
