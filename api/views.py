from shutil import ExecError
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import timedelta, datetime
import pytz

from .serializers import BlocksSerializer, CreateBlocksSerializer
from .models import Block


class GetBlocks(APIView):
    serializer_class = BlocksSerializer
    
    def post(self, request, format=None):
        date = request.data['date']
        if date == "":
            return
        # also filter the blocks for the correct date
        blocks = Block.objects.filter(user=request.user, date=date)
        data = BlocksSerializer(blocks, many=True).data

        # data[0]['start_time'] = "17:38:00"
        for block in data:
            start_time = datetime.strptime(block['start_time'], "%H:%M:%S")
            start_time = start_time.strftime("%-I:%M%p")
            block['start_time'] = start_time

            end_time = datetime.strptime(block['end_time'], "%H:%M:%S")
            end_time = end_time.strftime("%-I:%M%p")
            block['end_time'] = end_time

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

class DeleteBlock(APIView):

    def delete(self, request, *args, **kwargs):
        id = self.kwargs['id']
        block = Block.objects.get(id=id)
        if not block:
            # if we couldn't find a block with that id
            return Response({"Bad Request": f"No Block with ID: {id}"}, status=status.HTTP_404_NOT_FOUND)

        block.delete()

        return Response({"Success": "Deleted block"}, status=status.HTTP_200_OK)

class CreateBlock(APIView):
    serializer_class = CreateBlocksSerializer

    def post(self, request, format=None):
        try:
            if type(request.data['length']) == float:
                end_time = (datetime.strptime(request.data['start_time'], "%H:%M") + timedelta(hours=int(request.data['length']), minutes=30)).time()
            else:
                end_time = (datetime.strptime(request.data['start_time'], "%H:%M") + timedelta(hours=int(request.data['length']))).time()
        except:
            return Response({"Error": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)
            
        del request.data['length']
        request.data['end_time'] = end_time
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            topic = serializer.data.get('topic')
            start_time = serializer.data.get('start_time')
            end_time = serializer.data.get("end_time")
            date = serializer.data.get("date")

            # change date to take in an argument from the backend in the body through the JSON data it passes

            new_block = Block(user=request.user, topic=topic, start_time=start_time, end_time=end_time, date=date)
            new_block.save()

            new_block_data = BlocksSerializer(new_block).data

            # format start time and endtime
            start_time = datetime.strptime(new_block_data['start_time'], "%H:%M:%S")
            start_time = start_time.strftime("%-I:%M%p")
            new_block_data['start_time'] = start_time

            end_time = datetime.strptime(new_block_data['end_time'], "%H:%M:%S")
            end_time = end_time.strftime("%-I:%M%p")
            new_block_data['end_time'] = end_time

            return Response(new_block_data, status=status.HTTP_201_CREATED)

        return Response({"Error": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)