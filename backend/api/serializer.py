from rest_framework import serializers
from .models import Usuario, Estudiante, Asesor, Docente, Director, Ajuste, Notificacion, Asignatura, Caso, Entrevista, TipoAjuste

#Serializer para el modelo Usuario y subclases

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

#SERIALIZER DE UN SUBCONJUNTO DE CAMPOS DE USUARIO PARA USO EN BUSQUEDA POR NOMBRE Y CORREO
class UsuarioBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo']

# class EstudianteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Estudiante
#         fields = '__all__'

#     def get_estado_caso(self, estudiante):
#         # Obtener el estado del caso más reciente asociado al estudiante
#         ultimo_caso = estudiante.casos_estudiante.last()
#         if ultimo_caso:
#             return ultimo_caso.estado_caso
#         return "No tiene casos"

# #SERIALIZER DE USUARIO CON ESTUDIANTE PARA BUSQUEDA DETALLADA
# class UsuarioConEstudianteSerializer(serializers.ModelSerializer):
#     usuario = UsuarioBaseSerializer(source='id_usuario', read_only=True)
#     class Meta:
#         model = Estudiante
#         fields = ['rut', 'carrera', 'cede', 'usuario', 'telefono'] 

class EstudianteSerializer(serializers.ModelSerializer):
    #Traemos los datos (Nombre, Correo) desde usuario
    usuario = UsuarioBaseSerializer(source='id_usuario', read_only=True)

    #Agregamos el campo estado_caso al serializer
    estado_caso = serializers.SerializerMethodField()

    class Meta:
        model = Estudiante
        fields = ['id_usuario',
                  'usuario',
                  'rut',
                  'carrera',
                  'cede',
                  'telefono',
                  'estado_caso',
                  'fecha_matricula'
                  ]
    def get_estado_caso(self, estudiante):
        ultimo_caso = estudiante.casos_estudiante.last()

        if ultimo_caso:
            return ultimo_caso.estado_caso
        return "No tiene casos"

class AsesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asesor
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'

#Serializer para modelos centrales

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

#Serializer para modelos de proceso

class EntrevistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrevista
        fields = '__all__'

class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caso
        fields = '__all__'

class AjusteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ajuste
        fields = '__all__'

class TipoAjusteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAjuste
        fields = '__all__'