from django.contrib import admin
from .models import User, AuditLog

from unfold.admin import ModelAdmin


@admin.register(User)
class UserAdminClass(ModelAdmin):
    pass


@admin.register(AuditLog)
class AuditLogAdminClass(ModelAdmin):
    pass