from django.db.models import Q
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import Group
from django.utils import timezone
from django.contrib.auth import get_user_model
from utils.pagination import StandardResultsSetPagination
from utils.permissions import IsAdmin
from . import serializer
#from .filters import UserFilter
User = get_user_model()
class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializer.GroupSerializer
    queryset = Group.objects.all().order_by('name')

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializer.UserSerializer
    #filter_class = UserFilter
    queryset = User.objects.all().order_by('-date_joined').prefetch_related('groups')
    pagination_class = StandardResultsSetPagination
    permission_classes = (IsAdmin, )
    
    def get_queryset(self):
        qs = User.objects.all().order_by('-date_joined').prefetch_related('groups')
        return qs
   
    @action(detail=False, url_path="validate-username", methods=['get', ], permission_classes=[permissions.AllowAny])
    def validate_username(self, request):
        username = request.query_params.get('username')
        current_id = request.query_params.get('current_id')
        user = User.objects.filter(username__iexact=username)
        if current_id:
            user = user.exclude(id=int(current_id))
        if user.exists():
            return Response({'username': ['A user with that username already exists.']}, status=status.HTTP_400_BAD_REQUEST)
        return Response()

    @action(detail=False, url_path="me", methods=['get', ], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        return Response(self.serializer_class(request.user).data)
    
