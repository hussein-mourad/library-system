from django.urls import include, path
from rest_framework import routers

from .views import CurrentUserView, ProfileViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"profiles", ProfileViewSet)

urlpatterns = [
    path("", CurrentUserView.as_view(), name="current-user"),
]
