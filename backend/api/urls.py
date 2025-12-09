from django.urls import path
from .views import view_prueba, login_view, buscar_estudiante, registrar_caso, listar_motivos_view

urlpatterns = [
    path('status/', view_prueba, name='api_status'),
    path('login/', login_view, name='api_login'),
    path('estudiantes/buscar/', buscar_estudiante, name='buscar_estudiante'),
    path('casos/registrar/', registrar_caso, name='registrar_caso'),
    path('motivos/', listar_motivos_view, name='obtener_motivos_caso'),
]
