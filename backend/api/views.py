from rest_framework import status, response, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .serializer import UsuarioSerializer, EstudianteSerializer, AsesorSerializer, DocenteSerializer, DirectorSerializer, AjusteSerializer, NotificacionSerializer, AsignaturaSerializer, CasoSerializer, EntrevistaSerializer, TipoAjusteSerializer
from .models import Usuario, Estudiante, Asesor, Docente, Director, Ajuste, Notificacion, Asignatura, Caso, Entrevista, TipoAjuste

# Create your views here.

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

class TipoAjusteViewSet(viewsets.ModelViewSet):
    queryset = TipoAjuste.objects.all()
    serializer_class = TipoAjusteSerializer

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
    

@api_view(['POST'])
def registrar_caso(request):
    # Lógica para registrar un nuevo caso
    return Response({'message': 'Caso registrado exitosamente.'}, status=status.HTTP_201_CREATED)