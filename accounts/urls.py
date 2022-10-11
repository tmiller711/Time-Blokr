from django.urls import path
from .views import RegisterAccount, LoginAccount, GetSettings, UpdateSettings, GetProfile

urlpatterns = [
    path('registeraccount', RegisterAccount.as_view()),
    path('loginaccount', LoginAccount.as_view()),
    path('getsettings', GetSettings.as_view()),
    path('updatesettings', UpdateSettings.as_view()),
    path('profile', GetProfile.as_view()),
]
