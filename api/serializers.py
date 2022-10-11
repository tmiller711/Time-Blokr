from rest_framework import serializers
from .models import Block
from django.contrib.auth import get_user_model

class GetBlocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ('topic', 'start_time', 'end_time')