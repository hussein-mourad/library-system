from myauth.models import Profile, User
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["id", "user"]
        extra_kwargs = {
            "user": {"required": False},
            "bio": {"required": False},
            "address": {"required": False},
            "phone_number": {"required": False},
            "avatar": {"required": False},
        }


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

    def validate_email(self, value):
        """
        Check that the email is unique.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email address already exists."
            )
        return value
