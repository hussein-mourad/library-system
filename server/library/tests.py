from django.test import TestCase
from django.urls import reverse
from library.models import Author, Book, Borrow, Category, Comment
from myauth.models import User
from rest_framework import status
from rest_framework.test import APIClient


class AuthorViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_authors(self):
        response = self.client.get(reverse("author-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_author(self):
        data = {"name": "Test Author"}
        response = self.client.post(reverse("author-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Author.objects.filter(name="Test Author").exists())

    def test_retrieve_author(self):
        author = Author.objects.create(name="Test Author")
        response = self.client.get(reverse("author-detail", args=[author.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_author(self):
        author = Author.objects.create(name="Test Author")
        data = {"name": "Updated Author"}
        response = self.client.patch(reverse("author-detail", args=[author.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Author.objects.get(id=author.id).name, "Updated Author")

    def test_delete_author(self):
        author = Author.objects.create(name="Test Author")
        response = self.client.delete(reverse("author-detail", args=[author.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Author.objects.filter(id=author.id).exists())


class CategoryViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_categories(self):
        response = self.client.get(reverse("category-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_category(self):
        data = {"name": "Test Category"}
        response = self.client.post(reverse("category-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Category.objects.filter(name="Test Category").exists())

    def test_retrieve_category(self):
        category = Category.objects.create(name="Test Category")
        response = self.client.get(reverse("category-detail", args=[category.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_category(self):
        category = Category.objects.create(name="Test Category")
        data = {"name": "Updated Category"}
        response = self.client.patch(
            reverse("category-detail", args=[category.id]), data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.get(id=category.id).name, "Updated Category")

    def test_delete_category(self):
        category = Category.objects.create(name="Test Category")
        response = self.client.delete(reverse("category-detail", args=[category.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Category.objects.filter(id=category.id).exists())


class BookViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_books(self):
        response = self.client.get(reverse("book-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_book(self):
        author = Author.objects.create(name="Test Author")
        category = Category.objects.create(name="Test Category")
        data = {
            "title": "Test Book",
            "author": author.id,
            "category": category.id,
            "isbn": "1234567890123",
            "publication_date": "2021-01-01",
        }
        response = self.client.post(reverse("book-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Book.objects.filter(title="Test Book").exists())


class BorrowViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_borrows(self):
        response = self.client.get(reverse("borrow-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_borrow(self):
        user = User.objects.create(username="testuser")
        author = Author.objects.create(name="Test Author")
        category = Category.objects.create(name="Test Category")
        book = Book.objects.create(title="Test Book", author=author, category=category)
        data = {"user": user.id, "book": book.id}
        response = self.client.post(reverse("borrow-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Borrow.objects.filter(user=user, book=book).exists())


class CommentViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_comments(self):
        response = self.client.get(reverse("comment-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_comment(self):
        user = User.objects.create(username="testuser")
        author = Author.objects.create(name="Test Author")
        category = Category.objects.create(name="Test Category")
        book = Book.objects.create(title="Test Book", author=author, category=category)
        data = {"user": user.id, "book": book.id, "content": "Test Comment"}
        response = self.client.post(reverse("comment-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            Comment.objects.filter(
                user=user, book=book, content="Test Comment"
            ).exists()
        )
