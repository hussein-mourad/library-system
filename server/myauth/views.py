from myauth.models import Profile, User
from myauth.serializers import ProfileSerializer, UserSerializer
from rest_framework import permissions, viewsets
from rest_framework.mixins import Response
from rest_framework.views import APIView

from server.mixins import BulkActionsMixin
from server.permissions import IsOwnerOrAdmin


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
            role = self.request.data.get("role", None)
            # If the role is not specified, allow any user to create a new user
            if not role:
                return [permissions.AllowAny()]
            # A regular user can only create a member
            if role in ["admin", "librarian", "assistant"]:
                return [permissions.IsAdminUser()]
            return [permissions.AllowAny()]

        if self.action == "create":
            if self.request.user.role == "admin":
                return [permissions.AllowAny()]
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        user = serializer.save()
        if user.is_superuser or user.is_staff:
            user.role = "admin"
        if user.role != "member":
            user.is_staff = True
            user.is_superuser = True
        user.save()

    def perform_update(self, serializer):
        user = serializer.save()
        if user.role != "member":
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False
        user.save()


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        profile = Profile.objects.get(id=request.user.id)
        serializer_profile = ProfileSerializer(profile)
        return Response({"user": serializer.data, "profile": serializer_profile.data})


class ProfileViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    filterset_fields = ["id", "user", "phone_number", "address"]
    search_fields = ["id", "user", "phone_number", "address"]
    ordering_fields = ["id", "user", "phone_number", "address"]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Profile.objects.all()
        else:
            return Profile.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        user = self.request.user
        profile = Profile.objects.filter(user=user).first()
        if not profile:
            serializer.save(user=self.request.user)

    #
    # # def destroy(self, request, *args, **kwargs):
    # #     instance = self.get_object()
    # #     if instance.user == request.user:
    # #         return super().destroy(request, *args, **kwargs)
    # #     return Response(status=status.HTTP_403_FORBIDDEN)
