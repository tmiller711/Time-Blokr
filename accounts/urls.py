from django.urls import path
from .views import RegisterAccount, LoginAccount

urlpatterns = [
    path('registeraccount', RegisterAccount.as_view()),
    path('loginaccount', LoginAccount.as_view()),
]
