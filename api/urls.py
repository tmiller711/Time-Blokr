from django.urls import path

from .views import GetBlocks, UpdateBlocks, DeleteBlock, CreateBlock, Events

urlpatterns = [
    path("getblocks", GetBlocks.as_view()),
    path("updateblocks", UpdateBlocks.as_view()),
    path("deleteblock/<int:id>", DeleteBlock.as_view()),
    path("createblock", CreateBlock.as_view()),
    path("events", Events.as_view()),
]
