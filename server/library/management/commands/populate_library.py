import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
from library.models import Author, Book, Borrow, Category, Comment

fake = Faker()
User = get_user_model()

categories = [
    "Sport",
    "Fiction",
    "Science",
    "Biography",
    "History",
    "Cooking",
    "Travel",
    "Art",
    "Music",
    "Health",
]


class Command(BaseCommand):
    help = (
        "Populate  Author, Category, Book, Borrow, and Comment tables with sample data"
    )

    def handle(self, *args, **kwargs):
        Author.objects.all().delete()
        Category.objects.all().delete()
        Book.objects.all().delete()
        Borrow.objects.all().delete()
        Comment.objects.all().delete()

        self.populate_authors_and_categories()
        self.populate_books()
        self.populate_borrows()
        self.populate_comments()

        self.stdout.write(
            self.style.SUCCESS("Successfully populated all library tables")
        )

    def populate_authors_and_categories(self):
        # Populate authors
        for _ in range(5):
            Author.objects.create(name=fake.name(), bio=fake.paragraph())

        # Populate categories
        for _ in range(5):
            Category.objects.create(name=random.choice(categories))

    def populate_books(self):
        authors = Author.objects.all()
        categories = Category.objects.all()

        for _ in range(10):
            author = random.choice(authors)
            category = random.choice(categories)
            Book.objects.create(
                title=fake.catch_phrase(),
                author=author,
                description=fake.paragraph(),
                isbn=fake.isbn13(),
                year=fake.year(),
                category=category,
            )

    def populate_borrows(self):
        books = Book.objects.all()
        users = list(User.objects.values_list("id", flat=True))

        for _ in range(20):
            book = random.choice(books)
            user_id = random.choice(users)
            borrow_date = fake.date_time_this_year()
            return_date = fake.date_time_between_dates(borrow_date, "+30d")
            Borrow.objects.create(
                book=book,
                user_id=user_id,
                borrow_date=timezone.make_aware(borrow_date),
                return_date=timezone.make_aware(return_date),
            )

    def populate_comments(self):
        books = Book.objects.all()
        users = User.objects.all()

        for book in books:
            for _ in range(random.randint(1, 5)):
                user = random.choice(users)
                Comment.objects.create(book=book, user=user, content=fake.paragraph())
