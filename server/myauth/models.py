from django.contrib.auth.models import AbstractUser
from django.db import models
from library.utils import generate_filename


class User(AbstractUser):
    ROLES = [
        ("admin", "Admin"),
        ("librarian", "Librarian"),
        ("assistant", "Assistant"),
        ("borrower", "Borrower"),
    ]
    role = models.CharField(max_length=10, choices=ROLES, default="borrower")

    def __str__(self):
        self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username
