from django.urls import path

from .views import GetBlocks, UpdateBlocks

urlpatterns = [
    path("getblocks", GetBlocks.as_view()),
    path("updateblocks", UpdateBlocks.as_view()),
]
