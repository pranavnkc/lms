from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models  import Group

class ConfigViewset(APIView):
    permission_classes = (IsAuthenticated, )    
    def get(self, request):
        return Response(Group.objects.values())
# Create your views here.
