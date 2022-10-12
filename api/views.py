from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import BlocksSerializer
from .models import Block


class GetBlocks(APIView):
    serializer_class = BlocksSerializer
    
    def get(self, request, format=None):
        # also filter the blocks for the correct date
        blocks = Block.objects.filter(user=request.user)
        data = BlocksSerializer(blocks, many=True).data

        return Response(data, status=status.HTTP_200_OK)

class UpdateBlocks(APIView):
    serializer_class = BlocksSerializer

    def put(self, request, format=None):
        for block in request.data:
            block_lookup = Block.objects.get(id=block['id'])
            if not block_lookup:
                # if there is no block that exists with that id
                return Response({"Bad Request": f"No Block with ID: {block['id']}"}, status=status.HTTP_404_NOT_FOUND)

            block_lookup.topic = block['topic']
            block_lookup.save()

        return Response({"Success": "Updated blocks"}, status=status.HTTP_200_OK)