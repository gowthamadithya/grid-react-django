from django.urls import path, include
from .views import find_path

urlpatterns = [
    path('find-path', find_path)
]