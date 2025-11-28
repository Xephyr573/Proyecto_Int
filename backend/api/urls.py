from django.urls import path
from .views import status_check

urlpatterns = [
    path('status/', views.status_check, name='api_status'),
]
