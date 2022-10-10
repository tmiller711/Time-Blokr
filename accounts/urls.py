from django.urls import path
from .views import RegisterAccount

urlpatterns = [
    path('registeruser', RegisterAccount.as_view()),
    # path('loginuser', LoginUser.as_view()),
]
