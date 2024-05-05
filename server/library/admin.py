from django.contrib import admin
from library.models import Author, Book, Borrow, Category, Comment

admin.site.header = "Library Administration"
admin.site.site_header = "Library Administration"
admin.site.site_title = "Library Management System"
admin.site.index_title = "Welcome to Library Admin Mangement System"
admin.site.site_url = ""


admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Book)
admin.site.register(Borrow)
admin.site.register(Comment)
