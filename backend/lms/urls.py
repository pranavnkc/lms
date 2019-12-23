"""lms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from auth import views as auth_views
from accounts import views as user_views
from utils import views as utils_views  
router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', auth_views.AuthViewset.as_view()),
    path('api/config/', utils_views.ConfigViewset.as_view()),
    path('api/', include(router.urls)),
    path('api/mid-way-server/<str:path>/', utils_views.MidWayProxy.as_view()),
]
