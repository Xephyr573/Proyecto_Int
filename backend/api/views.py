from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class DebugPage(APIView):
    def get(self, request):
        data = {
            "message": "Prueba de funcionamiento",
            "user": "Zack"
        }
        return Response(data)

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