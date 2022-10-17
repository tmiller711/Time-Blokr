import re
from unicodedata import name
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from datetime import timedelta, datetime

from .models import Account, Pomodoro
from .serializers import (RegisterAccountSerializer, LoginAccountSerializer, AccountSettingsSerializer,
                        AccountProfileSerializer)

# Create your views here.


class RegisterAccount(APIView):
    serializer_class = RegisterAccountSerializer

    def post(self, request, format=None):
        # make it so users can be duplicates and other stuff that you need to check. Then send a different response for each one

        # replace this stuff by using a serializer
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            username = serializer.data.get('username')
            password = serializer.data.get('password')

            account = Account(email=email, username=username)
            account.set_password(password)
            account.is_active = True
            account.save()
            login(request, account)
            return Response({"Account Created": "Good Stuff cuh"}, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class LoginAccount(APIView):
    serializer_class = LoginAccountSerializer

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        if len(email) > 0 and len(password) > 0:
            try:
                account = authenticate(request, email=email, password=password)
            except:
                return Response({"Invalid Credentials": "Could not authenticate user"}, status=status.HTTP_404_NOT_FOUND)

            login(request, account)
            return Response({"Logged In": "Good Stuff cuh"}, status=status.HTTP_202_ACCEPTED)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class AccountSettings(APIView):
    serializer_class = AccountSettingsSerializer

    def get(self, request, format=None):
        account = request.user
        data = AccountSettingsSerializer(account).data

        # create a time to display on day page in correct format
        wake_up_time = datetime.strptime(data['wake_up_time'], "%H:%M:%S")
        wake_up_time = wake_up_time.strftime("%-I:%M%p")
        data['wake_up_time_display'] = wake_up_time

        bedtime = datetime.strptime(data['bedtime'], "%H:%M:%S")
        bedtime = bedtime.strftime("%-I:%M%p")
        data['bedtime_display'] = bedtime

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.timezone = serializer.data.get('timezone')
            user.wake_up_time = serializer.data.get("wake_up_time")
            user.bedtime = serializer.data.get("bedtime")
            user.save()
            return Response({"Message": "Success"}, status=status.HTTP_200_OK)

        return Response({"Message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


class AccountProfile(APIView):
    serializer_class = AccountProfileSerializer

    def get(self, request, format=None):
        account = request.user
        data = AccountProfileSerializer(account).data

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.name = serializer.data.get('name')
            user.phone = serializer.data.get('phone')
            user.save()
            return Response({"Message": "Success"}, status=status.HTTP_200_OK)

        return Response({"Message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)

class GetUser(APIView):

    def get(self, request, format=None):
        data = {"username": request.user.username, "name": request.user.name}
        return JsonResponse(data, status=status.HTTP_200_OK)

# create a view for getting the users pomodoro model and if it doesn't exist yet then create it
class PomodoroSettings(APIView):
    def get(self, request, format=None):
        settings = Pomodoro.objects.get_or_create(user=request.user)

        data = {'work_length': settings[0].work_length, 'break_length': settings[0].break_length}
        return JsonResponse(data, status=status.HTTP_200_OK)