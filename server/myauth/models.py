import os

from django.contrib.auth.models import AbstractUser
from django.db import models
from PIL import Image

from server.utils import generate_filename


class User(AbstractUser):
    ROLES = [
        ("admin", "Admin"),
        ("librarian", "Librarian"),
        ("assistant", "Assistant"),
        ("member", "Member"),
    ]
    role = models.CharField(max_length=10, choices=ROLES, default="member")

    class Meta:
        ordering = ["id"]

    def save(self, *args, **kwargs):
        if self.role == "admin":
            self.is_superuser = True
            self.is_staff = True
        if self.is_superuser or self.is_staff:
            self.role = "admin"
        super().save(*args, **kwargs)


class Profile(models.Model):
    IMAGE_FIELD = "avatar"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    avatar = models.ImageField(upload_to=generate_filename, blank=True, null=True)

    class Meta:
        ordering = ["id"]

    def save(self, *args, **kwargs):
        # save the profile first
        super().save(*args, **kwargs)
        # resize the image
        if not self.avatar:
            return
        if not self.avatar.path:
            return
        if not os.path.isfile(self.avatar.path):
            return
        img = Image.open(self.avatar.path)
        if img.height > 150 or img.width > 150:
            output_size = (150, 150)
            # create a thumbnail
            img.thumbnail(output_size)
            # overwrite the large image
            img.save(self.avatar.path)

    def __str__(self):
        return f"{self.user.username}'s Profile"
