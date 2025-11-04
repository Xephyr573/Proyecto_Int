from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class HelloWorldView(APIView):
    def get(self, request):
        data = {
            "mensaje": "Prueba de funcionamiento",
            "user": "Zack"
        }
        return Response(data)