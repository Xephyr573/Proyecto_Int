from django.db import migrations

def poblar_ajustes(apps, schema_editor):
    Ajuste = apps.get_model('api', 'Ajuste')

    # Mapeo de las letras (Frontend) a los valores del modelo (Backend)
    # A -> Presentacion
    # B -> Entorno
    # C -> Forma
    # D -> Tiempo
    
    lista_ajustes = [
        # =========================================================
        # A. PRESENTACIÓN DE LA INFORMACIÓN
        # =========================================================
        {"codigo": "A1", "tipo": "Presentacion", "titulo": "Amplificación de la letra (macrotipo) o imagen", "descripcion": "Usar letra de mayor tamaño o imágenes ampliadas en guías, presentaciones y evaluaciones."},
        {"codigo": "A2", "tipo": "Presentacion", "titulo": "Amplitud de la palabra o sonido", "descripcion": "Ajustar el volumen y la claridad del sonido para favorecer la comprensión auditiva."},
        {"codigo": "A3", "tipo": "Presentacion", "titulo": "Controlar la velocidad de la animación o sonido", "descripcion": "Regular la velocidad de videos, animaciones o audios para facilitar la comprensión."},
        {"codigo": "A4", "tipo": "Presentacion", "titulo": "Considerar y disponer ayudas tecnológicas para el acceso a la información", "descripcion": "Incorporar lectores de pantalla, lupas digitales u otras ayudas tecnológicas."},
        {"codigo": "A5", "tipo": "Presentacion", "titulo": "Utilización de textos escritos o hablados", "descripcion": "Ofrecer la información en formato escrito y/o oral según las necesidades del estudiante."},
        {"codigo": "A6", "tipo": "Presentacion", "titulo": "Uso de lengua de señas", "descripcion": "Contar con apoyo en lengua de señas para la comunicación y comprensión de contenidos."},
        {"codigo": "A7", "tipo": "Presentacion", "titulo": "Uso de sistema braille", "descripcion": "Proporcionar materiales o recursos adaptados a sistema braille cuando corresponda."},
        {"codigo": "A8", "tipo": "Presentacion", "titulo": "Uso de gráficos táctiles", "descripcion": "Incorporar gráficos y elementos táctiles para representar información relevante."},
        {"codigo": "A9", "tipo": "Presentacion", "titulo": "Audiolibros", "descripcion": "Facilitar el acceso a contenidos mediante audiolibros u otras lecturas grabadas."},
        {"codigo": "A10", "tipo": "Presentacion", "titulo": "Instrucciones concretas y en punteo", "descripcion": "Presentar las instrucciones en pasos breves, claros y ordenados en lista."},
        {"codigo": "A11", "tipo": "Presentacion", "titulo": "Explicar paso a paso lo que se pide o necesita realizar; explicar etapas y tiempos", "descripcion": "Detallar las etapas de la tarea, los tiempos y los productos esperados."},
        {"codigo": "A12", "tipo": "Presentacion", "titulo": "Evitar el uso de párrafos extensos", "descripcion": "Dividir la información en párrafos más breves o viñetas para favorecer la lectura."},
        {"codigo": "A13", "tipo": "Presentacion", "titulo": "Anticipar los criterios de evaluación, así como el tipo y tiempo de la misma", "descripcion": "Informar por adelantado qué se evaluará, cómo se evaluará y cuánto tiempo habrá."},
        {"codigo": "A14", "tipo": "Presentacion", "titulo": "Retroalimentar al estudiante respecto a su desempeño", "descripcion": "Entregar comentarios claros y específicos sobre el progreso y las dificultades."},
        {"codigo": "A15", "tipo": "Presentacion", "titulo": "Incorporar subtítulos en videos", "descripcion": "Agregar subtítulos o transcripciones en los materiales audiovisuales."},
        {"codigo": "A16", "tipo": "Presentacion", "titulo": "Utilizar puntero láser para presentaciones en PowerPoint", "descripcion": "Apoyar la explicación destacando elementos clave en la presentación."},
        {"codigo": "A17", "tipo": "Presentacion", "titulo": "Modular la voz de manera natural, no exagerada", "descripcion": "Mantener un tono de voz claro y adecuado, evitando exageraciones que distraigan."},
        {"codigo": "A18", "tipo": "Presentacion", "titulo": "En asignaturas de idiomas, trabajar de manera escrita y con imágenes", "descripcion": "Apoyar el aprendizaje con guías impresas, imágenes y recursos visuales adicionales."},
        {"codigo": "A19", "tipo": "Presentacion", "titulo": "Acompañar el diálogo con ejemplos en la pizarra o presentaciones", "descripcion": "Complementar la explicación oral con esquemas, ejemplos escritos o gráficos."},
        {"codigo": "A20", "tipo": "Presentacion", "titulo": "Utilizar organizadores gráficos", "descripcion": "Emplear mapas conceptuales, tablas u otros organizadores visuales de información."},
        {"codigo": "A21", "tipo": "Presentacion", "titulo": "Uso adecuado de contrastes de color en el material de apoyo", "descripcion": "Asegurar combinaciones de colores que faciliten la lectura de textos e imágenes."},
        {"codigo": "A22", "tipo": "Presentacion", "titulo": "Material impreso en relieve", "descripcion": "Entregar material físico con relieve para apoyar la percepción táctil."},
        {"codigo": "A23", "tipo": "Presentacion", "titulo": "Material impreso en 3D", "descripcion": "Utilizar recursos tridimensionales que faciliten la comprensión de conceptos."},
        {"codigo": "A24", "tipo": "Presentacion", "titulo": "Otras (Presentación)", "descripcion": "Otros ajustes que se relacionan con la presentación de la información al estudiante."},

        # =========================================================
        # B. ENTORNO
        # =========================================================
        {"codigo": "B1", "tipo": "Entorno", "titulo": "Situar al estudiante en un lugar estratégico para evitar distracción", "descripcion": "Ubicar al estudiante donde tenga menos distractores y mejor visibilidad."},
        {"codigo": "B2", "tipo": "Entorno", "titulo": "Ofrecer al estudiante un lugar estratégico en la sala para favorecer su participación", "descripcion": "Acordar con el estudiante el lugar más conveniente para participar y sentirse cómodo."},
        {"codigo": "B3", "tipo": "Entorno", "titulo": "Utilización de mobiliario adecuado", "descripcion": "Ajustar mesas, sillas u otros elementos para que resulten ergonómicos y accesibles."},
        {"codigo": "B4", "tipo": "Entorno", "titulo": "Ubicación de mobiliario en puntos estratégicos y que no dificulten el acceso", "descripcion": "Organizar el aula para evitar barreras físicas y facilitar la circulación."},
        {"codigo": "B5", "tipo": "Entorno", "titulo": "Promover cambios de posición", "descripcion": "Permitir que el estudiante se levante o cambie de postura cuando lo requiera."},
        {"codigo": "B6", "tipo": "Entorno", "titulo": "Intencionar equipos de trabajo, anticipando previamente su conformación", "descripcion": "Definir los grupos de trabajo considerando las necesidades del estudiante y avisar con anticipación."},
        {"codigo": "B7", "tipo": "Entorno", "titulo": "Flexibilizar el trabajo colaborativo (individual, duplas, pequeños grupos)", "descripcion": "Permitir que el estudiante participe individualmente o en grupos reducidos según corresponda."},
        {"codigo": "B8", "tipo": "Entorno", "titulo": "En caso de cambios de espacios, disponer del tiempo necesario para ajustar ayudas técnicas", "descripcion": "Considerar tiempos adicionales para el traslado y la instalación de apoyos."},
        {"codigo": "B9", "tipo": "Entorno", "titulo": "Intencionar normas y roles para el trabajo colaborativo", "descripcion": "Establecer reglas claras y roles definidos dentro de los equipos de trabajo."},
        {"codigo": "B10", "tipo": "Entorno", "titulo": "Hablar de frente al estudiante, no de la espalda", "descripcion": "Mantener contacto visual y una posición adecuada para favorecer la comunicación."},
        {"codigo": "B11", "tipo": "Entorno", "titulo": "Permitir el uso de dispositivos tecnológicos durante las clases y/o evaluaciones", "descripcion": "Autorizar el uso de dispositivos como apoyo para la participación y evaluación."},
        {"codigo": "B12", "tipo": "Entorno", "titulo": "Otras (Entorno)", "descripcion": "Otros ajustes vinculados al entorno físico o social del estudiante."},

        # =========================================================
        # C. FORMA DE RESPUESTA
        # =========================================================
        {"codigo": "C1", "tipo": "Forma", "titulo": "Texto escrito", "descripcion": "Permitir que el estudiante responda o participe mediante producciones escritas."},
        {"codigo": "C2", "tipo": "Forma", "titulo": "Sistema Braille", "descripcion": "Ofrecer la posibilidad de responder en sistema braille cuando sea necesario."},
        {"codigo": "C3", "tipo": "Forma", "titulo": "Lengua de señas", "descripcion": "Permitir o facilitar respuestas en lengua de señas mediante intérprete u otros recursos."},
        {"codigo": "C4", "tipo": "Forma", "titulo": "Transcripción de respuesta del estudiante", "descripcion": "Registrar por escrito la respuesta oral u otra forma de expresión del estudiante."},
        {"codigo": "C5", "tipo": "Forma", "titulo": "Ilustraciones", "descripcion": "Aceptar dibujos, esquemas u otras representaciones gráficas como parte de la respuesta."},
        {"codigo": "C6", "tipo": "Forma", "titulo": "En exposiciones, permitir el uso de elementos que bajen los niveles de ansiedad", "descripcion": "Autorizar apoyos como tarjetas, notas o elementos que ayuden a manejar la ansiedad."},
        {"codigo": "C7", "tipo": "Forma", "titulo": "Información oral", "descripcion": "Aceptar respuestas verbales en lugar de únicamente respuestas escritas."},
        {"codigo": "C8", "tipo": "Forma", "titulo": "En presentaciones, flexibilizar el nivel de intervención en voz alta", "descripcion": "Negociar formas alternativas de participación cuando hablar en voz alta genera malestar."},
        {"codigo": "C9", "tipo": "Forma", "titulo": "Dar mayor tiempo de respuesta y ejecución", "descripcion": "Otorgar tiempo adicional para que el estudiante pueda responder o presentar."},
        {"codigo": "C10", "tipo": "Forma", "titulo": "Promover el uso de audios como una forma de presentar contenidos", "descripcion": "Permitir que el estudiante entregue trabajos o evidencias en formato de audio."},
        {"codigo": "C11", "tipo": "Forma", "titulo": "Promover el uso de recursos gráficos y audiovisuales para presentar contenidos", "descripcion": "Autorizar presentaciones con apoyo de imágenes, videos u otros recursos audiovisuales."},
        {"codigo": "C12", "tipo": "Forma", "titulo": "Utilizar diferentes opciones de evaluación: oral, representación u otra", "descripcion": "Ofrecer alternativas de evaluación distintas a la prueba escrita tradicional."},
        {"codigo": "C13", "tipo": "Forma", "titulo": "Otras (Forma)", "descripcion": "Otros ajustes relacionados con las formas de respuesta y participación del estudiante."},

        # =========================================================
        # D. ORGANIZACIÓN DEL TIEMPO Y HORARIO
        # =========================================================
        {"codigo": "D1", "tipo": "Tiempo", "titulo": "Adecuar el tiempo utilizado en una actividad o evaluación", "descripcion": "Modificar la duración de ciertas actividades o evaluaciones según las necesidades del estudiante."},
        {"codigo": "D2", "tipo": "Tiempo", "titulo": "Organizar espacios de distensión", "descripcion": "Incorporar breves instancias de pausa o descanso durante la jornada."},
        {"codigo": "D3", "tipo": "Tiempo", "titulo": "Considerar, según sea necesario, el tiempo de inicio de la clase", "descripcion": "Ajustar el horario de inicio cuando el estudiante tarde más en llegar al aula."},
        {"codigo": "D4", "tipo": "Tiempo", "titulo": "En caso de cambios de actividades, anticipar al estudiante", "descripcion": "Informar con anticipación los cambios de actividad, evaluación o dinámica."},
        {"codigo": "D5", "tipo": "Tiempo", "titulo": "Disponer de un 25% de tiempo extra en las evaluaciones escritas u online", "descripcion": "Extender en un 25% el tiempo destinado a evaluaciones escritas u online."},
        {"codigo": "D6", "tipo": "Tiempo", "titulo": "Disponer de un 50% de tiempo extra en las evaluaciones escritas u online", "descripcion": "Extender en un 50% el tiempo disponible para las evaluaciones."},
        {"codigo": "D7", "tipo": "Tiempo", "titulo": "Disponer de un 75% de tiempo extra en las evaluaciones escritas u online", "descripcion": "Extender en un 75% el tiempo disponible para las evaluaciones."},
        {"codigo": "D8", "tipo": "Tiempo", "titulo": "Otras (Tiempo)", "descripcion": "Otros ajustes vinculados a la organización del tiempo y la planificación de evaluaciones."},
    ]

    print("Iniciando carga de Ajustes Razonables...")
    
    for item in lista_ajustes:
        # Combinamos Código y Título porque el modelo no tiene campo 'codigo'
        # Ejemplo: "A1 - Amplificación de la letra..."
        titulo_completo = f"{item['codigo']} - {item['titulo']}"

        # Usamos update_or_create para no duplicar si corres esto dos veces
        obj, created = Ajuste.objects.update_or_create(
            titulo=titulo_completo,
            defaults={
                'descripcion': item['descripcion'],
                'tipo': item['tipo']
            }
        )
        if created:
            print(f"Creado: {titulo_completo}")

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_datos_usuarios'), # <--- OJO: Verifica que esto coincida con tu última migración
    ]

    operations = [
        migrations.RunPython(poblar_ajustes, reverse_code=migrations.RunPython.noop),
    ]