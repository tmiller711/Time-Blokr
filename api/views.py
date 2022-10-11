from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import GetBlocksSerializer
from .models import Block


class GetBlocks(APIView):
    serializer_class = GetBlocksSerializer
    
    def get(self, request, format=None):
        blocks = Block.objects.filter(user=request.user)
        # print(blocks)
        data = GetBlocksSerializer(blocks, many=True).data

        return Response(data, status=status.HTTP_200_OK)