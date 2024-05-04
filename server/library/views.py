from django.shortcuts import render
from django.utils.version import os
from library.models import Author, Book, Borrow, Category, Comment
from rest_framework import serializers, viewsets


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

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


class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
