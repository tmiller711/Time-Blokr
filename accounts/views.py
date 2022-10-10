from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt

from .models import Account
from .serializers import RegisterAccountSerializer, LoginAccountSerializer

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
            account = authenticate(request, email=email, password=password)
            login(request, account)
            return Response({"Logged In": "Good Stuff cuh"}, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)
