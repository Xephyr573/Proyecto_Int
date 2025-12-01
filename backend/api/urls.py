from django.urls import path
from .views import view_prueba, login_view, buscar_estudiante

urlpatterns = [
    path('status/', view_prueba, name='api_status'),
    path('login/', login_view, name='api_login'),
    path('estudiantes/buscar/', buscar_estudiante, name='buscar_estudiante'),
]
