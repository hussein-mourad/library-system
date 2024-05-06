from myauth.models import Profile, User
from myauth.serializers import ProfileSerializer, UserSerializer
from rest_framework import permissions, viewsets

from server.mixins import ImageCleanupMixin


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_fields = ["role", "is_active", "date_joined"]
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


class ProfileViewSet(ImageCleanupMixin, viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_fields = ["user", "bio", "address", "phone_number"]
    search_fields = ["bio", "address", "phone_number"]
    odering_fields = ["bio", "address", "phone_number"]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Profile.objects.all()
        else:
            return Profile.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
