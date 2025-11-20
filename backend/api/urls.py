from django.urls import path
from .views import login_view, DebugPage

urlpatterns = [
    path('hello/', DebugPage.as_view(), name='hello'),
    path('login/', view=login_view, name='login'),
]
