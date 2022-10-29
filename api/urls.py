from django.urls import path

from .views import GetBlocks, UpdateBlocks, DeleteBlock, CreateBlock, Events, DeleteEvent

urlpatterns = [
    path("getblocks", GetBlocks.as_view()),
    path("updateblocks", UpdateBlocks.as_view()),
    path("deleteblock/<int:id>", DeleteBlock.as_view()),
    path("createblock", CreateBlock.as_view()),
    path("events", Events.as_view()),
    path("deleteevent/<int:id>", DeleteEvent.as_view()),
]
