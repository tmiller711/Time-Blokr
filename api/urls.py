from django.urls import path

from .views import GetBlocks

urlpatterns = [
    path("getblocks", GetBlocks.as_view())
]
