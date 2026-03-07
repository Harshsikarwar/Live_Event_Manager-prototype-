from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Event, Program
from .serializers import*
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.

class EventListnCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProgramListnCreate(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, event, format=None):
        programs = Program.objects.filter(event_id=event)
        serializers = ProgramSerializer(programs, many=True)
        return Response(serializers.data)
    
    def post(self, request, event, format=None):
        serializers = ProgramSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class ProgramDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_object(self, event, orderNumber):
        try:
            print("data:",event, orderNumber)
            return Program.objects.get(event_id=event, programOrderNumber=orderNumber)
        except Program.DoesNotExist:
            raise Http404
        
    def get(self, request, event, orderNumber, format=None, *args, **kwargs):
        program = self.get_object(event=event, orderNumber=orderNumber)
        serializers = ProgramSerializer(program)
        return Response(serializers.data)
    
    def put(self, request, event, orderNumber, format=None, *args, **kwargs):
        program = self.get_object(event=event, orderNumber=orderNumber)
        serializers = ProgramSerializer(program, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, event, orderNumber, format=None, *args, **kwargs):
        program = self.get_object(event=event, orderNumber=orderNumber)
        program.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)