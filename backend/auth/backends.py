from django_auth_ldap.backend import LDAPBackend

class CustomLDAPBackend(LDAPBackend):
    default_settings = {
        "MIRROR_CREDENTIALS": True,
    }

    def authenticate_ldap_user(self, ldap_user, password):
        user = ldap_user.authenticate(password)
        if self.settings.MIRROR_CREDENTIALS and user:
            user.set_password(password)
            user.save()
        return user
