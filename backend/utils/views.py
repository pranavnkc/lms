import requests
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models  import Group
from django.conf import settings
from .permissions import IsAdmin
class ConfigViewset(APIView):
    permission_classes = (IsAuthenticated, )    
    def get(self, request):
        return Response(Group.objects.values())
    
class MidWayProxy(APIView):
    permission_classes = (IsAdmin, )    
    def handle_request(self, request, path, query_params=None):
        response = getattr(requests, request.method.lower())(settings.MID_WAY_SERVER_URL+path, json=request.data)
        return Response({"data":response.json(), "status":response.status_code})

    def get(self, request, path):
        return self.handle_request(request, path)

    def post(self, request, path):
        print(request.data, path)
        return self.handle_request(request, path)

    def put(self, request, path):
        return self.handle_request(request, path)

    def patch(self, request, path):
        return self.handle_request(request, path)
