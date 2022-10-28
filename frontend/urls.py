from django.urls import path
from .views import index, logout_account

urlpatterns = [
    path('', index),
    path('calendar/', index),
    path('profile/', index),
    path('settings/', index),
    path('register/', index),
    path('login/', index),
    path('logout/', logout_account),
]
