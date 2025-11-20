from django.urls import path
from .views import CrearCasoView

urlpatterns = [
    path('crear-caso/', CrearCasoView.as_view(), name='hello'),
]
