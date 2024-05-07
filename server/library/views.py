from django.utils.version import os
from library.models import Author, Book, Borrow, Category, Comment
from library.serializers import (AuthorSerializer, BookSerializer,
                                 BorrowSerializer, CategorySerializer,
                                 CommentSerializer)
from rest_framework import viewsets

from server.mixins import BulkActionsMixin


class AuthorViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filterset_fields = ["name"]
    ordering_fields = ["name"]
    search_fields = ["$name"]


class CategoryViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ["name"]
    ordering_fields = ["name"]
    search_fields = ["$name"]


class BookViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    ordering_fields = "__all__"
    filterset_fields = ["title", "author", "category"]
    search_fields = ["$title", "author__name", "category__name", "description"]

    def perform_update(self, serializer):
        """Ensure the old image file is deleted when a new image is uploaded."""
        instance = serializer.instance
        old_instance = Book.objects.get(pk=instance.pk)
        old_image = old_instance.cover_image
        new_image = serializer.validated_data.get("cover_image", None)
        # Call the parent perform_update method to save the update
        super().perform_update(serializer)
        # Compare old and new images
        if old_image and new_image and old_image.read() != new_image.read():
            # Delete the old image file
            if os.path.isfile(old_image.path):
                os.remove(old_image.path)


class BorrowViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer
    filterset_fields = ["book", "user"]
    ordering_fields = ["book", "user", "borrow_date", "return_date"]
    search_fields = ["$book__title", "user__username"]

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.book.status = "borrowed"
        instance.book.save()

    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.returned:
            instance.book.status = "available"
            instance.book.save()
        else:
            instance.book.status = "borrowed"
            instance.book.save()

    def perform_destroy(self, instance):
        instance.book.status = "available"
        instance.book.save()
        instance.delete()

    def perform_bulk_destroy(self, queryset):
        for instance in queryset:
            instance.book.status = "available"
            instance.book.save()
        queryset.delete()


class CommentViewSet(BulkActionsMixin, viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ["book", "user"]
    ordering_fields = ["book", "user", "created_at"]
    search_fields = ["$content", "book__title", "user__username"]
