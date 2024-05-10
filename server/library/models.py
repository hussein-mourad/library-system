from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import timezone
from myauth.models import User

from server.utils import generate_filename


class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class Category(models.Model):
    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ["id"]

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Book(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("borrowed", "Borrowed"),
    ]
    IMAGE_FIELD = "cover"

    class Meta:
        ordering = ["id"]

    class Meta:
        ordering = ["id"]

    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    isbn = models.CharField(max_length=30, unique=True)
    cover = models.ImageField(
        upload_to=generate_filename,
        blank=True,
        null=True,
    )
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="available"
    )

    def __str__(self):
        return self.title


class Borrow(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(null=False, blank=False, default=datetime.now)
    return_date = models.DateTimeField(null=True, blank=True)
    returned = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"

    @property
    def is_overdue(self):
        return not self.returned and self.return_date < timezone.now()


class Comment(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
