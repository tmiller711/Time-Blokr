from django.urls import path
from .views import RegisterAccount, LoginAccount, AccountSettings, AccountProfile

urlpatterns = [
    path('registeraccount', RegisterAccount.as_view()),
    path('loginaccount', LoginAccount.as_view()),
    path('settings', AccountSettings.as_view()),
    path('profile', AccountProfile.as_view()),
]
