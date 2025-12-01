from django.urls import path
from .views import view_prueba

urlpatterns = [
    path('status/', view_prueba, name='api_status'),
]
