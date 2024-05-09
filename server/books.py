import random

from faker import Faker
from library.models import Author, Book, Category

fake = Faker()

authors = Author.objects.all()
categories = Category.objects.all()

for _ in range(150):
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
