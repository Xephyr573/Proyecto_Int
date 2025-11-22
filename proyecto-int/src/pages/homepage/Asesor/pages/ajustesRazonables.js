// src/pages/homepage/Asesor/pages/ajustesRazonables.js

// Nombre de las categorías
export const CATEGORIAS = {
  A: "Presentación de la información",
  B: "Entorno",
  C: "Forma de respuesta",
  D: "Organización del tiempo y horario",
};

// Tabla completa de ajustes (A, B, C y D)
export const AJUSTES_POR_CATEGORIA = {
  // =========================================================
  // A. PRESENTACIÓN DE LA INFORMACIÓN
  // =========================================================
  A: [
    {
      codigo: "A1",
      titulo: "Amplificación de la letra (macrotipo) o imagen",
      descripcion:
        "Usar letra de mayor tamaño o imágenes ampliadas en guías, presentaciones y evaluaciones.",
    },
    {
      codigo: "A2",
      titulo: "Amplitud de la palabra o sonido",
      descripcion:
        "Ajustar el volumen y la claridad del sonido para favorecer la comprensión auditiva.",
    },
    {
      codigo: "A3",
      titulo: "Controlar la velocidad de la animación o sonido",
      descripcion:
        "Regular la velocidad de videos, animaciones o audios para facilitar la comprensión.",
    },
    {
      codigo: "A4",
      titulo:
        "Considerar y disponer ayudas tecnológicas para el acceso a la información",
      descripcion:
        "Incorporar lectores de pantalla, lupas digitales u otras ayudas tecnológicas.",
    },
    {
      codigo: "A5",
      titulo: "Utilización de textos escritos o hablados",
      descripcion:
        "Ofrecer la información en formato escrito y/o oral según las necesidades del estudiante.",
    },
    {
      codigo: "A6",
      titulo: "Uso de lengua de señas",
      descripcion:
        "Contar con apoyo en lengua de señas para la comunicación y comprensión de contenidos.",
    },
    {
      codigo: "A7",
      titulo: "Uso de sistema braille",
      descripcion:
        "Proporcionar materiales o recursos adaptados a sistema braille cuando corresponda.",
    },
    {
      codigo: "A8",
      titulo: "Uso de gráficos táctiles",
      descripcion:
        "Incorporar gráficos y elementos táctiles para representar información relevante.",
    },
    {
      codigo: "A9",
      titulo: "Audiolibros",
      descripcion:
        "Facilitar el acceso a contenidos mediante audiolibros u otras lecturas grabadas.",
    },
    {
      codigo: "A10",
      titulo: "Instrucciones concretas y en punteo",
      descripcion:
        "Presentar las instrucciones en pasos breves, claros y ordenados en lista.",
    },
    {
      codigo: "A11",
      titulo:
        "Explicar paso a paso lo que se pide o necesita realizar; explicar etapas y tiempos",
      descripcion:
        "Detallar las etapas de la tarea, los tiempos y los productos esperados.",
    },
    {
      codigo: "A12",
      titulo: "Evitar el uso de párrafos extensos",
      descripcion:
        "Dividir la información en párrafos más breves o viñetas para favorecer la lectura.",
    },
    {
      codigo: "A13",
      titulo:
        "Anticipar los criterios de evaluación, así como el tipo y tiempo de la misma",
      descripcion:
        "Informar por adelantado qué se evaluará, cómo se evaluará y cuánto tiempo habrá.",
    },
    {
      codigo: "A14",
      titulo: "Retroalimentar al estudiante respecto a su desempeño",
      descripcion:
        "Entregar comentarios claros y específicos sobre el progreso y las dificultades.",
    },
    {
      codigo: "A15",
      titulo: "Incorporar subtítulos en videos",
      descripcion:
        "Agregar subtítulos o transcripciones en los materiales audiovisuales.",
    },
    {
      codigo: "A16",
      titulo: "Utilizar puntero láser para presentaciones en PowerPoint",
      descripcion:
        "Apoyar la explicación destacando elementos clave en la presentación.",
    },
    {
      codigo: "A17",
      titulo: "Modular la voz de manera natural, no exagerada",
      descripcion:
        "Mantener un tono de voz claro y adecuado, evitando exageraciones que distraigan.",
    },
    {
      codigo: "A18",
      titulo:
        "En asignaturas de idiomas, trabajar de manera escrita y con imágenes",
      descripcion:
        "Apoyar el aprendizaje con guías impresas, imágenes y recursos visuales adicionales.",
    },
    {
      codigo: "A19",
      titulo:
        "Acompañar el diálogo con ejemplos en la pizarra o presentaciones",
      descripcion:
        "Complementar la explicación oral con esquemas, ejemplos escritos o gráficos.",
    },
    {
      codigo: "A20",
      titulo: "Utilizar organizadores gráficos",
      descripcion:
        "Emplear mapas conceptuales, tablas u otros organizadores visuales de información.",
    },
    {
      codigo: "A21",
      titulo:
        "Uso adecuado de contrastes de color en el material de apoyo",
      descripcion:
        "Asegurar combinaciones de colores que faciliten la lectura de textos e imágenes.",
    },
    {
      codigo: "A22",
      titulo: "Material impreso en relieve",
      descripcion:
        "Entregar material físico con relieve para apoyar la percepción táctil.",
    },
    {
      codigo: "A23",
      titulo: "Material impreso en 3D",
      descripcion:
        "Utilizar recursos tridimensionales que faciliten la comprensión de conceptos.",
    },
    {
      codigo: "A24",
      titulo:
        "Otras (solicitar incorporar otros ajustes razonables al sistema de registro)",
      descripcion:
        "Otros ajustes que se relacionan con la presentación de la información al estudiante.",
      requiereDetalle: true,
    },
  ],

  // =========================================================
  // B. ENTORNO
  // =========================================================
  B: [
    {
      codigo: "B1",
      titulo:
        "Situar al estudiante en un lugar estratégico para evitar distracción",
      descripcion:
        "Ubicar al estudiante donde tenga menos distractores y mejor visibilidad.",
    },
    {
      codigo: "B2",
      titulo:
        "Ofrecer al estudiante un lugar estratégico en la sala para favorecer su participación",
      descripcion:
        "Acordar con el estudiante el lugar más conveniente para participar y sentirse cómodo.",
    },
    {
      codigo: "B3",
      titulo: "Utilización de mobiliario adecuado",
      descripcion:
        "Ajustar mesas, sillas u otros elementos para que resulten ergonómicos y accesibles.",
    },
    {
      codigo: "B4",
      titulo:
        "Ubicación de mobiliario en puntos estratégicos y que no dificulten el acceso",
      descripcion:
        "Organizar el aula para evitar barreras físicas y facilitar la circulación.",
    },
    {
      codigo: "B5",
      titulo: "Promover cambios de posición",
      descripcion:
        "Permitir que el estudiante se levante o cambie de postura cuando lo requiera.",
    },
    {
      codigo: "B6",
      titulo:
        "Intencionar equipos de trabajo, anticipando previamente su conformación",
      descripcion:
        "Definir los grupos de trabajo considerando las necesidades del estudiante y avisar con anticipación.",
    },
    {
      codigo: "B7",
      titulo:
        "Flexibilizar el trabajo colaborativo (individual, duplas, pequeños grupos)",
      descripcion:
        "Permitir que el estudiante participe individualmente o en grupos reducidos según corresponda.",
    },
    {
      codigo: "B8",
      titulo:
        "En caso de cambios de espacios, disponer del tiempo necesario para ajustar ayudas técnicas",
      descripcion:
        "Considerar tiempos adicionales para el traslado y la instalación de apoyos.",
    },
    {
      codigo: "B9",
      titulo:
        "Intencionar normas y roles para el trabajo colaborativo",
      descripcion:
        "Establecer reglas claras y roles definidos dentro de los equipos de trabajo.",
    },
    {
      codigo: "B10",
      titulo: "Hablar de frente al estudiante, no de la espalda",
      descripcion:
        "Mantener contacto visual y una posición adecuada para favorecer la comunicación.",
    },
    {
      codigo: "B11",
      titulo:
        "Permitir el uso de dispositivos tecnológicos durante las clases y/o evaluaciones",
      descripcion:
        "Autorizar el uso de dispositivos como apoyo para la participación y evaluación.",
    },
    {
      codigo: "B12",
      titulo:
        "Otras (solicitar incorporar otros ajustes razonables al sistema de registro)",
      descripcion:
        "Otros ajustes vinculados al entorno físico o social del estudiante.",
      requiereDetalle: true,
    },
  ],

  // =========================================================
  // C. FORMA DE RESPUESTA
  // =========================================================
  C: [
    {
      codigo: "C1",
      titulo: "Texto escrito",
      descripcion:
        "Permitir que el estudiante responda o participe mediante producciones escritas.",
    },
    {
      codigo: "C2",
      titulo: "Sistema Braille",
      descripcion:
        "Ofrecer la posibilidad de responder en sistema braille cuando sea necesario.",
    },
    {
      codigo: "C3",
      titulo: "Lengua de señas",
      descripcion:
        "Permitir o facilitar respuestas en lengua de señas mediante intérprete u otros recursos.",
    },
    {
      codigo: "C4",
      titulo: "Transcripción de respuesta del estudiante",
      descripcion:
        "Registrar por escrito la respuesta oral u otra forma de expresión del estudiante.",
    },
    {
      codigo: "C5",
      titulo: "Ilustraciones",
      descripcion:
        "Aceptar dibujos, esquemas u otras representaciones gráficas como parte de la respuesta.",
    },
    {
      codigo: "C6",
      titulo:
        "En exposiciones, permitir el uso de elementos que bajen los niveles de ansiedad",
      descripcion:
        "Autorizar apoyos como tarjetas, notas o elementos que ayuden a manejar la ansiedad.",
    },
    {
      codigo: "C7",
      titulo: "Información oral",
      descripcion:
        "Aceptar respuestas verbales en lugar de únicamente respuestas escritas.",
    },
    {
      codigo: "C8",
      titulo:
        "En presentaciones, flexibilizar el nivel de intervención en voz alta",
      descripcion:
        "Negociar formas alternativas de participación cuando hablar en voz alta genera malestar.",
    },
    {
      codigo: "C9",
      titulo: "Dar mayor tiempo de respuesta y ejecución",
      descripcion:
        "Otorgar tiempo adicional para que el estudiante pueda responder o presentar.",
    },
    {
      codigo: "C10",
      titulo:
        "Promover el uso de audios como una forma de presentar contenidos",
      descripcion:
        "Permitir que el estudiante entregue trabajos o evidencias en formato de audio.",
    },
    {
      codigo: "C11",
      titulo:
        "Promover el uso de recursos gráficos y audiovisuales para presentar contenidos",
      descripcion:
        "Autorizar presentaciones con apoyo de imágenes, videos u otros recursos  audiovisuales.",
    },
    {
      codigo: "C12",
      titulo:
        "Utilizar diferentes opciones de evaluación: oral, representación u otra",
      descripcion:
        "Ofrecer alternativas de evaluación distintas a la prueba escrita tradicional.",
    },
    {
      codigo: "C13",
      titulo:
        "Otras (solicitar incorporar otros ajustes razonables al sistema de registro)",
      descripcion:
        "Otros ajustes relacionados con las formas de respuesta y participación del estudiante.",
      requiereDetalle: true,
    },
  ],

  // =========================================================
  // D. ORGANIZACIÓN DEL TIEMPO Y HORARIO
  // =========================================================
  D: [
    {
      codigo: "D1",
      titulo:
        "Adecuar el tiempo utilizado en una actividad o evaluación",
      descripcion:
        "Modificar la duración de ciertas actividades o evaluaciones según las necesidades del estudiante.",
    },
    {
      codigo: "D2",
      titulo: "Organizar espacios de distensión",
      descripcion:
        "Incorporar breves instancias de pausa o descanso durante la jornada.",
    },
    {
      codigo: "D3",
      titulo:
        "Considerar, según sea necesario, el tiempo de inicio de la clase",
      descripcion:
        "Ajustar el horario de inicio cuando el estudiante tarde más en llegar al aula.",
    },
    {
      codigo: "D4",
      titulo:
        "En caso de cambios de actividades, anticipar al estudiante",
      descripcion:
        "Informar con anticipación los cambios de actividad, evaluación o dinámica.",
    },
    {
      codigo: "D5",
      titulo:
        "Disponer de un 25% de tiempo extra en las evaluaciones escritas u online",
      descripcion:
        "Extender en un 25% el tiempo destinado a evaluaciones escritas u online.",
    },
    {
      codigo: "D6",
      titulo:
        "Disponer de un 50% de tiempo extra en las evaluaciones escritas u online",
      descripcion:
        "Extender en un 50% el tiempo disponible para las evaluaciones.",
    },
    {
      codigo: "D7",
      titulo:
        "Disponer de un 75% de tiempo extra en las evaluaciones escritas u online",
      descripcion:
        "Extender en un 75% el tiempo disponible para las evaluaciones.",
    },
    {
      codigo: "D8",
      titulo:
        "Otras (solicitar incorporar otros ajustes razonables al sistema de registro)",
      descripcion:
        "Otros ajustes vinculados a la organización del tiempo y la planificación de evaluaciones.",
      requiereDetalle: true,
    },
  ],
};
