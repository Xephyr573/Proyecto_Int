from rest_framework import status, response, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from django.utils import timezone
from .serializer import UsuarioSerializer, EstudianteSerializer, AsesorSerializer, DocenteSerializer, DirectorSerializer, AjusteSerializer, NotificacionSerializer, AsignaturaSerializer, CasoSerializer, EntrevistaSerializer, UsuarioBaseSerializer
from .models import Usuario, Estudiante, Asesor, Docente, Director, Ajuste, Notificacion, Asignatura, Caso, Entrevista, MotivoCaso
from .utils import limpiar_rut, formatear_rut, obtener_semestre_actual

from django.views.decorators.csrf import csrf_exempt

# Create your views here.

#CONSTANTES DE MENSAJES DE ERROR
ERROR_SERVER = 'Ocurrio un error interno del servidor.'


#=============================
# VIEWSETS USUARIO Y ROLES
#=============================
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

class AsesorViewSet(viewsets.ModelViewSet):
    queryset = Asesor.objects.all()
    serializer_class = AsesorSerializer

class DocenteViewSet(viewsets.ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer

class DirectorViewSet(viewsets.ModelViewSet):
    queryset = Director.objects.all()
    serializer_class = DirectorSerializer

#=============================
# VIEWSETS NOTIFICACIONES Y ASIGNATURAS
#=============================

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer

#=============================
# VIEWSETS DE PROCESO
#=============================

class CasoViewSet(viewsets.ModelViewSet):
    queryset = Caso.objects.all()
    serializer_class = CasoSerializer

class EntrevistaViewSet(viewsets.ModelViewSet):
    queryset = Entrevista.objects.all()
    serializer_class = EntrevistaSerializer
    
class AjusteViewSet(viewsets.ModelViewSet):
    queryset = Ajuste.objects.all()
    serializer_class = AjusteSerializer

#=============================
#VIEWS DE MANEJO DE DATOS
#=============================

#VIEW DE PRUEBA
@api_view(['GET'])
def view_prueba(request):
    return response.Response({"message": "Hello, world!", "user": "Proyecto Integrador"}, status=status.HTTP_200_OK)

# VIEW DE LOGIN
@api_view(['POST'])
#@permission_classes([AllowAny])
def login_view(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    if not correo or not contrasena: # Verifica que ambos campos estén presentes
        return Response({'error': 'Correo y contraseña son requeridos.'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # Intenta autenticar al usuario
    try:
        usuario = Usuario.objects.get(correo=correo) # Busca el usuario por correo
        if not check_password(contrasena, usuario.contrasena): # Verifica la contraseña hasheada
            return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED) # Si la contraseña es incorrecta

        response_data = {
            'success': True,
            'id_usuario': usuario.id_usuario,
            'nombre': usuario.nombre,
            'correo': usuario.correo,
            'rol': usuario.rol,
            'datos_perfil': {} # Aquí guardaremos lo específico
        }

        # 4. Lógica de Perfiles
        # --- ASESOR ---
        if usuario.rol == 'Asesor':
            try:
                response_data['datos_perfil'] = {
                    'especialidad': usuario.asesor.especialidad, # 'CTP' o 'Pedagogico'
                    'telefono': usuario.asesor.telefono_contacto
                }
            except Asesor.DoesNotExist:
                response_data['datos_perfil'] = {'error': 'Perfil de Asesor no encontrado'}

        # --- ESTUDIANTE ---
        elif usuario.rol == 'Estudiante':
             try:
                response_data['datos_perfil'] = {
                    'rut': usuario.estudiante.rut,
                    'carrera': usuario.estudiante.carrera,
                    'estado_caso': usuario.estudiante.estado_caso
                }
             except Estudiante.DoesNotExist:
                 response_data['datos_perfil'] = {'error': 'Perfil de Estudiante no encontrado'}

        # --- DOCENTE ---
        elif usuario.rol == 'Docente':
             try:
                # Asumiendo que Docente tiene OneToOne sin related_name específico
                response_data['datos_perfil'] = {
                    'cumplimiento': usuario.docente.cumplimiento,
                    'observaciones': usuario.docente.observaciones
                }
             except Docente.DoesNotExist:
                 response_data['datos_perfil'] = {'error': 'Perfil de Docente no encontrado'}

        # --- DIRECTOR ---
        elif usuario.rol == 'Director':
             try:
                # ¡IMPORTANTE! Usamos 'director_profile' por el related_name en tu modelo
                perfil = usuario.director_profile
                response_data['datos_perfil'] = {
                    'id_director': perfil.id_director, # ID específico de la tabla director
                    'comentarios': perfil.comentarios
                }
             except Exception: 
                 # Capturamos Exception genérica aquí porque si related_name falla
                 # puede lanzar AttributeError en vez de DoesNotExist
                 response_data['datos_perfil'] = {'error': 'Perfil de Director no encontrado'}
        
        # 5. Retorno final
        return Response(response_data, status=200)

    except Usuario.DoesNotExist: # Si el usuario no existe
        return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    except Exception as e:
        print("Error en login_view:", str(e)) # Log del error para debugging (Solo nosotros)
        return Response({'error': 'Ocurrio un error interno del servidor.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) # Error genérico del servidor

@api_view(['GET'])
def buscar_estudiante(request):
    termino_busqueda = request.query_params.get('q', None) #q obtiene el termino de busqueda, que puede ser nombre, correo o rut

    if not termino_busqueda:
        return Response({'error': 'El término de búsqueda es requerido.'}, status=status.HTTP_400_BAD_REQUEST)
    
    rut_limpio = limpiar_rut(termino_busqueda) # Limpiamos el RUT de puntos, guiones y espacios
    rut_formateado = formatear_rut(rut_limpio) # Formateamos el RUT limpio para buscar también en ese formato


    try:
        estudiante = Estudiante.objects.get(
            Q(rut__iexact=rut_formateado) | # 1. Búsqueda por RUT formateado
            Q(id_usuario__nombre__iexact=termino_busqueda) | # 2. Búsqueda por Correo (a través de la FK)
            Q(id_usuario__correo__iexact=termino_busqueda) # 3. Búsqueda por Nombre (contiene, insensible)
        )

    except Estudiante.DoesNotExist:
        return Response({'error': 'Estudiante no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        print("Error en buscar_estudiante:", str(e)) # Log del error para debugging (Solo nosotros)
        return Response({'error': ERROR_SERVER}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    serializer = EstudianteSerializer(estudiante)
    return Response(serializer.data, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_caso(request):
    # Lógica para registrar un nuevo caso
    data = request.data # Datos enviados en la solicitud POST

    rut_estudiante = data.get('rut_estudiante')
    id_asesor = data.get('id_asesor') # ID del usuario logueado

    if not rut_estudiante or not id_asesor:
        return Response({'error': 'RUT del estudiante y ID del asesor son requeridos.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        try:
            estudiante = Estudiante.objects.get(rut=rut_estudiante)
        except Estudiante.DoesNotExist:
            return Response({'error': 'Estudiante no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            asesor = Asesor.objects.get(id_usuario__id_usuario=id_asesor)
        except Asesor.DoesNotExist:
            return Response({'error': 'Asesor no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        motivo_obj = None # Aquí deberíamos obtener el objeto MotivoCaso basado en los datos recibidos
        id_motivo = data.get('id_motivo')

        if id_motivo:
            try:
                motivo_obj = MotivoCaso.objects.get(pk=id_motivo)
            except MotivoCaso.DoesNotExist:
                return Response({'error': 'Motivo del caso no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        if not motivo_obj:
             return Response({'error': 'Debe seleccionar un motivo válido.'}, status=400)
        
        nuevo_caso = Caso.objects.create(
            id_usuario_estudiante=estudiante,
            id_usuario_asesor=asesor,
            motivo=motivo_obj,
            descripcion=data.get('descripcion', ''),
            #Datos automaticos
            estado_caso=Caso.ESTADO_INICIADO,
            fecha_ingreso_caso=timezone.now(),
            semestre=obtener_semestre_actual()
        )

        return Response({'success': True,
                        'message': 'Caso registrado exitosamente.', 
                        'id_caso': nuevo_caso.id_caso,
                        'estudiante': estudiante.rut}, status=status.HTTP_201_CREATED)
    except Exception as e:
        print("Error en registrar_caso:", str(e)) # Log del error para debugging (Solo nosotros)
        return Response({'error': ERROR_SERVER}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
#Vista para obetener la lista de motivos
@api_view(['GET'])
def listar_motivos_view(request):
    """
    Devuelve la lista de motivos.
    """
    try:
        motivos = MotivoCaso.objects.all().values('id', 'nombre')
        
        # Convertimos el QuerySet a una lista estándar de Python para enviarla
        return Response(list(motivos), status=200)

    except Exception as e:
        print(f"Error listando motivos: {e}")
        return Response([], status=500) # En caso de error, devolvemos lista vacía para no romper el front