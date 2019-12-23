from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):

    """
    Allows access only to users in 'admin' group
    """
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=('lms-admin',)).exists()
