from myauth.models import Profile, User
from rest_framework import permissions, serializers, viewsets


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "role",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
            "password",
        ]
        read_only_fields = ["id", "is_active", "date_joined"]
        extra_kwargs = {
            "username": {"required": True},
            "role": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "email": {"required": False},
            "password": {"write_only": True, "required": True},
        }


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

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
        if user.role == "admin":
            user.is_staff = True
            user.is_superuser = True
        user.save()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "user",
            "bio",
            "address",
            "phone_number",
            "avatar",
        ]
        read_only_fields = ["id"]
        extra_kwargs = {
            "user": {"required": False},
            "bio": {"required": False},
            "address": {"required": False},
            "phone_number": {"required": False},
            "avatar": {"required": False},
        }


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Profile.objects.all()
        else:
            return Profile.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
