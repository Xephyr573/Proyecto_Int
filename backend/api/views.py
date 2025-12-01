from rest_framework.views import APIView
from rest_framework import status, response, viewsets
from django.shortcuts import render
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

# class DocumentoViewSet(viewsets.ModelViewSet):
#     queryset = Documento.objects.all()
#     serializer_class = DocumentoSerializer

# class InscripcionViewSet(viewsets.ModelViewSet):
#     queryset = Inscripcion.objects.all()
#     serializer_class = InscripcionSerializer
    
class AjusteViewSet(viewsets.ModelViewSet):
    queryset = Ajuste.objects.all()
    serializer_class = AjusteSerializer

class TipoAjusteViewSet(viewsets.ModelViewSet):
    queryset = TipoAjuste.objects.all()
    serializer_class = TipoAjusteSerializer

# class CrearCasoView(APIView):
#     def post(self, request):
#         data = request.data #Captura el JSON enviado desde React
#         rut_recibido = data.get('rut_estudiante') #No estamos utilizando el rut, usamos el correo para ingresar el login

#         if not rut_recibido:
#             return Response({"error": "El Rut es obligatorio."}, status=status.HTTP_404_NOT_FOUND) #404 es 'recurso no encontrado', deberia ser 400

#         try:
#             estudiante = Estudiante.objects.get(rut=rut_recibido) #Comprueba si el estudiante existe
#         except Estudiante.DoesNotExist:
#             return Response({"error": "Estudiante no encontrado. Resgístrelo primero."}, status=status.HTTP_404_NOT_FOUND)

#         id_asesor = data.get('id_asesor')

#         nuevo_caso_data = {
#             "id_usuario_estudiante": estudiante.pk,
#             "id_usuario_asesor": id_asesor,
#             "id_asignatura": None,
#             "estado_caso": "Abierto",
#             "evaluacion": f"MOTIVO: {data.get('motivo')} - DETALLE: {data.get('detalle')} - ORIGEN: {data.get('origen')}"
#         }

#         serializer = CasoSerializer(data=nuevo_caso_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"mensaje": "Caso creado", "id": serializer.data['id_diagnostico']}, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#CREACION DE ENDPOINT DE LOGIN
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario # Asegúrate de que importas tu modelo Usuario

@api_view(['POST']) #Solo acepta peticiones POST
@permission_classes([AllowAny]) #Permite acceso sin autenticación
def login_view(request):

    # request.data contiene el JSON enviado por React
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    if not correo or not contrasena:
        return Response({'error': 'Correo y contraseña son requeridos.'}, 
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        # --- LÓGICA DE VALIDACIÓN MANUAL ---
        # 1. Buscar el usuario por correo
        usuario = Usuario.objects.get(correo=correo)
        
        # 2. Verificar la contraseña
        # Puesto que la contraseña en la BD está en texto plano (en la migración),
        # comparamos directamente. ¡Esto NO ES SEGURO en producción!
        if usuario.contrasena != contrasena:
            return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Respuesta exitosa
        return Response({
            'success': 'Login exitoso',
            'user_id': usuario.id,
            'nombre': usuario.nombre,
            'rol': usuario.rol  # ¡Clave para la redirección en React!
        }, status=status.HTTP_200_OK)

    except Usuario.DoesNotExist:
        return Response({'error': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def view_prueba(request):
    return response.Response({"message": "Hello, world!", "user": "Proyecto Integrador"}, status=status.HTTP_200_OK)