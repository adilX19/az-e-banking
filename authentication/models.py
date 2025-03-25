from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    address = models.TextField()
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class AuditLog(models.Model):
    ACTION_CHOICES = (
        ('LOGIN', 'LOGIN'), ('LOGOUT', 'LOGOUT'), ('REGISTER', 'REGISTER'), ('PASSWORD_CHANGE', 'PASSWORD_CHANGE'),
        ('CREATE_ACCOUNT', 'CREATE_ACCOUNT'), ('UPDATE_ACCOUNT', 'UPDATE_ACCOUNT'), ('DELETE_ACCOUNT', 'DELETE_ACCOUNT'),
        ('INITIATE_TRANSFER', 'INITIATE_TRANSFER'), ('COMPLETE_TRANSFER', 'COMPLETE_TRANSFER'), ('FAILED_TRANSFER', 'FAILED_TRANSFER'),
        ('USER_UPDATE', 'USER_UPDATE'), ('ROLE_ASSIGNMENT', 'ROLE_ASSIGNMENT'),
        ('MFA_ENABLED', 'MFA_ENABLED'), ('CARD_BLOCKED', 'CARD_BLOCKED')
    )

    STATUS_CHOICES = (
        ('SUCCESS', 'SUCCESS'),
        ('FAILED', 'FAILED'),
        ('PARTIAL', 'PARTIAL'),
    )

    log_id = models.CharField(max_length=300)
    user = models.ForeignKey(User, related_name='audit_logs', on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=50)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} performed {self.action}"