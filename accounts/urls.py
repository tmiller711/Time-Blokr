from django.urls import path
from .views import PomodoroSettings, RegisterAccount, LoginAccount, AccountSettings, AccountProfile, GetUser

urlpatterns = [
    path('registeraccount', RegisterAccount.as_view()),
    path('loginaccount', LoginAccount.as_view()),
    path('settings', AccountSettings.as_view()),
    path('profile', AccountProfile.as_view()),
    path('getuser', GetUser.as_view()),
    path('pomodoro', PomodoroSettings.as_view())
]
