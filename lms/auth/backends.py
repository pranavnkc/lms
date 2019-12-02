from django_auth_ldap.backend import LDAPBackend

class CustomLDAPBackend(LDAPBackend):
    default_settings = {
        "MIRROR_CREDENTIALS": False,
    }

    def authenticate_ldap_user(self, ldap_user, password):
        user = ldap_user.authenticate(password)
        if self.settings.MIRROR_CREDENTIALS and user:
            user.set_password(password)
            # Do something else like refresh how long the local copy
            # will be valid if you allow mirroring of credentials. This 
            # will mitigate security issues.
            user.save()
        return user
