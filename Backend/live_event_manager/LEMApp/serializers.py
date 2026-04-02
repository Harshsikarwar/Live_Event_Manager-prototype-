from rest_framework import serializers
from .models import*

class EventSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.username', read_only=True)
    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ["organizer"]

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = "__all__" 