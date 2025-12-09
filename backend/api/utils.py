#AQUI SE GUARDAN FUNCIONES UTILITARIAS QUE PUEDEN SER USADAS EN VARIOS LUGARES DEL PROYECTO
from django.utils import timezone

def limpiar_rut(texto):
    """
    Elimina puntos, guiones y espacios. Convierte a mayúsculas.
    Ej: "12.345.678-k" -> "12345678K"
    """
    if not texto:
        return ""
    return texto.replace(".", "").replace("-", "").replace(" ", "").upper()

def formatear_rut(rut_limpio):
    """
    Recibe: '123456789' (o '12345678K')
    Devuelve: '12.345.678-9'
    """
    if not rut_limpio or len(rut_limpio) < 2:
        return rut_limpio # Devuelve tal cual si es muy corto o inválido

    # Separamos cuerpo y dígito verificador
    cuerpo = rut_limpio[:-1]
    dv = rut_limpio[-1]

    # Formateamos el cuerpo con puntos de miles
    # El truco: invertimos el string, agrupamos de a 3, unimos con puntos y volvemos a invertir
    cuerpo_formateado = ".".join([cuerpo[::-1][i:i+3] for i in range(0, len(cuerpo), 3)])[::-1]

    return f"{cuerpo_formateado}-{dv}"

def obtener_semestre_actual():
    """
    Devuelve '2025-1' o '2025-2' basado en la fecha actual.
    """
    fecha_actual = timezone.now()
    anno = fecha_actual.year
    mes = fecha_actual.month
    
    # Si estamos entre Enero (1) y Julio (7), es primer semestre
    if 1 <= mes <= 7:
        return f"{anno}-1"
    else:
        return f"{anno}-2"