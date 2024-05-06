from django.db import transaction
from myauth.models import Profile, User
from myauth.serializers import ProfileSerializer, UserSerializer
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.mixins import Response
from rest_framework.views import Request

from server.mixins import BulkActionsMixin


class UserViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = [
        "id",
        "username",
        "last_name",
        "email",
        "role",
        "is_active",
        "date_joined",
    ]
    search_fields = ["username", "first_name", "last_name", "email"]
    ordering_fields = ["username", "first_name", "last_name", "email", "date_joined"]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return User.objects.all()
        else:
            return User.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        user = serializer.save()
        if user.is_superuser or user.is_staff:
            user.role = "admin"
        if user.role != "borrower":
            user.is_staff = True
            user.is_superuser = True
        user.save()

    def perform_update(self, serializer):
        user = serializer.save()
        if user.role != "borrower":
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False
        user.save()


class ProfileViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["id", "user", "phone_number", "address"]
    search_fields = ["id", "user", "phone_number", "address"]
    ordering_fields = ["id", "user", "phone_number", "address"]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Profile.objects.all()
        else:
            return Profile.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
