from rest_framework import serializers
from .models import Block, Event
from django.contrib.auth import get_user_model

class BlocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ('id', 'topic', 'start_time', 'end_time', 'date')

class CreateBlocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ('topic', 'start_time', 'end_time', 'date')

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'start', 'end', 'allDay')