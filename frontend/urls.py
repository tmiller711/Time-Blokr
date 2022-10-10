from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('profile/', index),
    path('settings/', index),
    path('register/', index),
    path('login/', index),
]
