from django.urls import path

from .views import GetBlocks, UpdateBlocks, DeleteBlock

urlpatterns = [
    path("getblocks", GetBlocks.as_view()),
    path("updateblocks", UpdateBlocks.as_view()),
    path("deleteblock/<int:id>", DeleteBlock.as_view()),
]
