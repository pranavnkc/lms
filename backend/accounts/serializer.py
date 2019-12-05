from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db import transaction
User = get_user_model()

class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        exclude = ('permissions',)

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)
    groups = GroupSerializer(many=True, read_only=True)

    def validate_role(self, value):
        return Group.objects.filter(name=value).first()
    
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password':{
                'write_only': True
            }
        }
    transaction.atomic()   
    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.pop('role')
        if role.name=='admin':
            validated_data['is_staff'] = True
            validated_data['is_superuser'] = True
        user = super(UserSerializer, self).create(validated_data)
        user.groups.add(role)
        user.set_password(password)
        user.save()
        return user
    
    transaction.atomic()   
    def update(self, instance, validated_data):
        existing_roles = instance.groups.values_list('name', flat=True)
        if validated_data.get('role') and validated_data['role'].name not in existing_roles:
            instance.groups.clear()
            instance.groups.add(validated_data['role'])
            validated_data['is_staff'] = validated_data['role'].name == 'admin'
            validated_data['is_superuser'] = validated_data['is_staff']
        return super(UserSerializer, self).update(instance, validated_data)
    
    
    def to_representation(self, obj):
        ret = super(UserSerializer, self).to_representation(obj)
        ret['role'] = obj.groups.first()
        ret['name'] = obj.get_full_name()
        ret['role']  = ret['role'].name if ret['role'] else ret['role'] 
        return ret
