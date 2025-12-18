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
    telefono = models.CharField(max_length=14, blank=True) #Se agrego el campo telefono
    carrera = models.CharField(max_length=100, blank=True)
    cede = models.CharField(max_length=100, blank=True)
    #Borre estado_caso ya que lo sacaremos directamente desde el modelo Caso
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

class MotivoCaso(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Ajuste(models.Model):
    class TipoAjuste(models.TextChoices):
        PRESENTACION = 'Presentacion', 'Presentacion de la informacion'
        ENTORNO = 'Entorno', 'Entorno'
        FORMA = 'Forma', 'Forma de respuesta'
        TIEMPO = 'Tiempo', 'Organizacion del tiempo y horario'

    id_ajuste = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=190, unique=True)
    descripcion = models.TextField(verbose_name="Descipción del ajuste")
    tipo = models.CharField(
        max_length=20,
        choices=TipoAjuste.choices,
        default=TipoAjuste.PRESENTACION
    )

    def __str__(self):
        return f"{self.titulo} ({self.tipo})"
    
    class Meta:
        verbose_name = "Ajuste Razonable"
        verbose_name_plural = "Ajustes Razonables"

class SolicitudAjuste(models.Model):
    class EstadoSolicitudAjuste(models.TextChoices):
        PROPUESTO = 'Propuesto', 'Propuesto por asesor'
        APROBADO = 'Aprobado', 'Aprobado por Director/CTP'
        RECHAZADO = 'Rechazado', 'Rechazado'

    caso = models.ForeignKey('Caso', on_delete=models.CASCADE, related_name='ajustes_solicitados')
    ajuste = models.ForeignKey(Ajuste, on_delete=models.PROTECT)

    estado = models.CharField(
        max_length=20,
        choices=EstadoSolicitudAjuste.choices,
        default=EstadoSolicitudAjuste.PROPUESTO
    )

    comentario_desicion = models.TextField(blank=True, verbose_name="Motivo de rechazo")
    fecha_decision = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.ajuste.titulo} para Caso {self.caso.id_caso} ({self.estado})"
    
class Caso(models.Model):
    #Creamos constantes para evitar errores tipograficos
    ESTADO_INICIADO = 'Iniciado'
    ESTADO_ABIERTO = 'Abierto'
    ESTADO_FINALIZADO = 'Finalizado'

    #Creamos una tupla de tuplas para las opciones de estado
    ESTADO_CHOICES = [
        (ESTADO_INICIADO, 'Iniciado'),
        (ESTADO_ABIERTO, 'Abierto'),
        (ESTADO_FINALIZADO, 'Finalizado'),
    ]

    # id_caso (PK)
    id_caso = models.AutoField(primary_key=True)
    id_usuario_estudiante = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, related_name='casos_estudiante')
    id_usuario_asesor = models.ForeignKey(Asesor, on_delete=models.SET_NULL, null=True, related_name='casos_asesor')
    estado_caso = models.CharField(
        max_length=12, 
        choices=ESTADO_CHOICES, 
        default=ESTADO_INICIADO # Al crear, nace como 'Iniciado'
    )
    motivo = models.ForeignKey(MotivoCaso, 
                               on_delete=models.PROTECT, # Evita borrar motivo si hay casos asociados
                               verbose_name="Motivo del Caso",
                               null=True,
                               blank=True)
    fecha_ingreso_caso = models.DateField(default=ahora)
    semestre = models.CharField(max_length=8, blank=True) # Ejemplo: 2025-1
    descripcion = models.TextField(blank=True, verbose_name="Descripción del Caso")

    ajustes = models.ManyToManyField(
    Ajuste,
    through='SolicitudAjuste',
    related_name='casos',
    blank=True
    )

    def __str__(self):
        return f"Caso {self.id_caso} de {self.id_usuario_estudiante.id_usuario.nombre}"

class Entrevista(models.Model):
    class EstadoEntrevista(models.TextChoices):
        PROGRAMADA = 'Programada', 'Programada'
        REALIZADA = 'Realizada', 'Realizada'
        CANCELADA = 'Cancelada', 'Cancelada'
        NO_ASISTIO = 'No Asistio', 'Estudiante no asistió'

    id_entrevista = models.AutoField(primary_key=True)

    caso = models.ForeignKey(
        'Caso',
        on_delete=models.CASCADE,
        related_name='entrevistas'
    )

    fecha_hora = models.DateTimeField(verbose_name='Fecha y hora de la entrevista')

    estado = models.CharField(
        max_length=20,
        choices=EstadoEntrevista.choices,
        default=EstadoEntrevista.PROGRAMADA
    )

    def __str__(self):
        # Podemos acceder al nombre del estudiante a través del Caso
        return f"Entrevista {self.caso.id_usuario_estudiante.id_usuario.nombre} - {self.fecha_hora.strftime('%d/%m %H:%M')}"
