import random
import tempfile

from django.core.files import File
from django.core.management.base import BaseCommand
from myauth.models import Profile, User
from PIL import Image

users_data = [
    {
        "username": "admin",
        "email": "admin@test.com",
        "password": "admin",
        "role": "admin",
    },
    {
        "username": "librarian",
        "email": "librarian@test.com",
        "password": "librarian",
        "role": "librarian",
    },
    {
        "username": "assistant",
        "email": "assitant@test.com",
        "password": "assistant",
        "role": "assistant",
    },
    {
        "username": "borrower",
        "email": "borrower@test.com",
        "password": "borrower",
        "role": "borrower",
    },
]


class Command(BaseCommand):
    help = "Populate User and Profile tables with sample data"

    def handle(self, *args, **kwargs):
        User.objects.all().delete()
        Profile.objects.all().delete()
        for user_data in users_data:
            user = User.objects.create_user(**user_data)
            # Profile.objects.create(
            #     user=user,
            #     bio=f"This is {user.username}'s bio",
            #     address="Sample Address",
            #     phone_number="1234567890",
            #     # avatar=self.create_random_image(),
            # )

        self.stdout.write(
            self.style.SUCCESS("Successfully populated users and profiles")
        )

    def create_random_image(self):
        # Generate a random image
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f:
            image = Image.new(
                "RGB",
                (100, 100),
                (
                    random.randint(0, 255),
                    random.randint(0, 255),
                    random.randint(0, 255),
                ),
            )
            image.save(f, "JPEG")
            return File(f)
