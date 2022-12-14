from rest_framework import serializers
from .models import Account, Pomodoro
from django.contrib.auth import get_user_model


class RegisterAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'password')


class LoginAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'password')

class AccountSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('timezone', 'wake_up_time', 'bedtime')

class AccountProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('name', 'phone')

class PomodoroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pomodoro
        fields = ('work_length', 'break_length')