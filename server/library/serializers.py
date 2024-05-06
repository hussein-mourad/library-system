from library.models import Author, Book, Borrow, Category, Comment
from rest_framework import serializers


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(source="author.name")
    category = serializers.StringRelatedField(source="category.name")
    # To include the author and category details in the response, use the following code:
    # author = AuthorSerializer()
    # category = CategorySerializer()

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
