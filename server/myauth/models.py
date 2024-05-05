from django.contrib.auth.models import AbstractUser
from django.db import models
from library.utils import generate_filename
from PIL import Image


class User(AbstractUser):
    ROLES = [
        ("admin", "Admin"),
        ("librarian", "Librarian"),
        ("assistant", "Assistant"),
        ("borrower", "Borrower"),
    ]
    role = models.CharField(max_length=10, choices=ROLES, default="borrower")


class Profile(models.Model):
    IMAGE_FIELD = "avatar"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    avatar = models.ImageField(upload_to=generate_filename, blank=True, null=True)

    def save(self, *args, **kwargs):
        # save the profile first
        super().save(*args, **kwargs)
        # resize the image
        if not self.avatar:
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
