from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Profile, User


class UserViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="admin123"
        )
        self.client.force_authenticate(user=self.admin_user)

    def test_list_users(self):
        response = self.client.get(reverse("user-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_update_user(self):
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        data = {"username": "updateduser", "email": "updated@example.com"}
        response = self.client.patch(reverse("user-detail", args=[user.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.username, "updateduser")
        self.assertEqual(user.email, "updated@example.com")

    def test_delete_user(self):
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        response = self.client.delete(reverse("user-detail", args=[user.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(username="testuser").exists())

    def test_list_users_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse("user-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_user_unauthenticated(self):
        self.client.logout()
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "test123",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_user_unauthenticated(self):
        self.client.logout()
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        data = {"username": "updateduser", "email": "updated@example.com"}
        response = self.client.patch(reverse("user-detail", args=[user.id]), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_user_unauthenticated(self):
        self.client.logout()
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        response = self.client.delete(reverse("user-detail", args=[user.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin_user_as_non_admin(self):
        self.client.logout()
        non_admin_user = User.objects.create_user(
            username="user", email="user@example.com", password="user123"
        )
        self.client.force_authenticate(user=non_admin_user)
        data = {
            "username": "adminuser",
            "email": "admin@example.com",
            "password": "admin123",
            "role": "admin",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_other_user_as_non_admin(self):
        self.client.logout()
        non_admin_user = User.objects.create_user(
            username="user", email="user@example.com", password="user123"
        )
        self.client.force_authenticate(user=non_admin_user)
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        data = {"username": "updateduser", "email": "updated@example.com"}
        response = self.client.put(reverse("user-detail", args=[user.id]), data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_user_invalid_data(self):
        data = {"username": "", "email": "invalid_email", "password": "short"}
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_non_existent_user(self):
        data = {"username": "updateduser", "email": "updated@example.com"}
        response = self.client.patch(reverse("user-detail", args=[999]), data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_non_existent_user(self):
        response = self.client.delete(reverse("user-detail", args=[999]))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_user_existing_username(self):
        User.objects.create_user(
            username="existinguser", email="test@example.com", password="test123"
        )
        data = {
            "username": "existinguser",
            "email": "new@example.com",
            "password": "newpassword",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_existing_email(self):
        User.objects.create_user(
            username="testuser", email="existing@example.com", password="test123"
        )
        data = {
            "username": "newuser",
            "email": "existing@example.com",
            "password": "newpassword",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_pagination(self):
        for i in range(11):
            User.objects.create_user(
                username=f"user{i}", email=f"user{i}@example.com", password="test123"
            )

        response = self.client.get(reverse("user-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)
        self.assertEqual(len(response.data["results"]), 10)
        self.assertIn("count", response.data)
        self.assertIn("next", response.data)
        self.assertIn("previous", response.data)

    def test_unicode_username(self):
        data = {
            "username": "unicodeuser_äöü",
            "email": "unicode@example.com",
            "password": "unicode123",
        }
        response = self.client.post(reverse("user-list"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="unicodeuser_äöü").exists())


class ProfileViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", email="test@example.com", password="test123"
        )
        self.profile = Profile.objects.filter(user=self.user).first()
        self.client.force_authenticate(user=self.user)

    def test_list_profiles(self):
        response = self.client.get(reverse("profile-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        data = {"phone_number": "9876543210", "address": "Updated Address"}
        response = self.client.patch(
            reverse("profile-detail", args=[self.profile.id]), data
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.phone_number, "9876543210")
        self.assertEqual(self.profile.address, "Updated Address")

    def test_delete_profile(self):
        response = self.client.delete(reverse("profile-detail", args=[self.profile.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Profile.objects.filter(user=self.user).exists())

    def test_list_profiles_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse("profile-list"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_profile_unauthenticated(self):
        self.client.logout()
        data = {"phone_number": "1234567890", "address": "Test Address"}
        response = self.client.post(reverse("profile-list"), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile_unauthenticated(self):
        self.client.logout()
        data = {"phone_number": "9876543210", "address": "Updated Address"}
        response = self.client.patch(
            reverse("profile-detail", args=[self.profile.id]), data
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_profile_unauthenticated(self):
        self.client.logout()
        response = self.client.delete(reverse("profile-detail", args=[self.profile.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile_invalid_data(self):
        data = {"phone_number": "invalid_phone_number", "address": "Updated Address"}
        response = self.client.patch(
            reverse("profile-detail", args=[self.profile.id]), data
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_auto_create_profile_signal(self):
        # Create a new user to trigger the signal
        new_user = User.objects.create_user(
            username="newuser", email="new@example.com", password="new123"
        )
        # Retrieve the profile associated with the new user
        profile = Profile.objects.get(user=new_user)
        # Ensure that the profile exists
        self.assertIsNotNone(profile)
