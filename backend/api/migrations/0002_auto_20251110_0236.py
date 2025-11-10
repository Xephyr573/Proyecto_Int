# mi_app/migrations/0002_data_inicial.py

from django.db import migrations
from django.utils import timezone

def crear_usuarios_iniciales(apps, schema_editor):
    # Obtenemos los modelos históricos del estado actual
    Usuario = apps.get_model('api', 'Usuario')
    Asesor = apps.get_model('api', 'Asesor')
    Estudiante = apps.get_model('api', 'Estudiante')
    Docente = apps.get_model('api', 'Docente')
    Director = apps.get_model('api', 'Director')

    # --- CREAR USUARIO BASE (CLASE PADRE) ---
    
    # NOTA: Las contraseñas aquí son solo ejemplos y no están encriptadas.

    # 1. Asesor Pedagógico
    u1 = Usuario.objects.create(
        nombre="Andrea Lopez (Asesor)", 
        correo="asesor@sistema.cl", 
        contrasenia="pass123", 
        rol="Asesor"
    )
    Asesor.objects.create(
        usuario=u1, 
        especialidad="Psicopedagogía", 
        telefono_contacto="911112222"
    )

    # 2. Estudiante
    u2 = Usuario.objects.create(
        nombre="Carlos Perez (Estudiante)", 
        correo="estudiante@sistema.cl", 
        contrasenia="pass123", 
        rol="Estudiante"
    )
    Estudiante.objects.create(
        usuario=u2, 
        rut="19.123.456-7", 
        carrera="Ingeniería", 
        estado_caso="Pendiente", 
        fecha_matricula=timezone.now().date()
    )

    # 3. Docente
    u3 = Usuario.objects.create(
        nombre="Javier Soto (Docente)", 
        correo="docente@sistema.cl", 
        contrasenia="pass123", 
        rol="Docente"
    )
    Docente.objects.create(
        usuario=u3, 
        observaciones="Profesor de cálculo.", 
        cumplimiento=True
    )

    # 4. Director
    u4 = Usuario.objects.create(
        nombre="Maria Rodriguez (Director)", 
        correo="director@sistema.cl", 
        contrasenia="pass123", 
        rol="Director"
    )
    # Director tiene su propia PK (id_director) y FK a Usuario
    Director.objects.create(
        id_usuario=u4, 
        comentarios="Director de la escuela de Ingeniería."
    )
    
    # --- FIN DE CREACIÓN DE USUARIOS ---

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(crear_usuarios_iniciales),
    ]