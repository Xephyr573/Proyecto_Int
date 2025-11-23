from rest_framework import serializers
from .models import Usuario, Estudiante, Asesor, Docente, Director, Ajuste, Notificacion, Asignatura, Caso, Entrevista, TipoAjuste

#Serializer para el modelo Usuario y subclases

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'

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

# class InscripcionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Inscripcion
#         fields = '__all__'

class AjusteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ajuste
        fields = '__all__'

class TipoAjusteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAjuste
        fields = '__all__'

# class DocumentoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Documento
#         fields = '__all__'