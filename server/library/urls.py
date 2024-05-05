from django.urls import include, path
from rest_framework import routers

from .views import (AuthorViewSet, BookViewSet, BorrowViewSet, CategoryViewSet,
                    CommentViewSet)

router = routers.DefaultRouter()
router.register(r"authors", AuthorViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"books", BookViewSet)
router.register(r"borrows", BorrowViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
