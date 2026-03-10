from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Event, Program
from .serializers import EventSerializer, ProgramSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import transaction


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reorder_programs(request, event):

    programs = request.data.get("programs", [])

    with transaction.atomic():

        for item in programs:

            Program.objects.filter(
                id=item["id"],
                event_id=event
            ).update(
                programOrderNumber=item["order"]
            )

    return Response({"message": "order updated"})

class EventListnCreate(generics.ListCreateAPIView):

    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):

        if self.request.user.is_authenticated:
            return Event.objects.filter(organizer=self.request.user)

        return Event.objects.all()

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProgramListnCreate(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, event):

        programs = Program.objects.filter(
            event_id=event
        ).order_by("programOrderNumber")

        serializer = ProgramSerializer(programs, many=True)

        return Response(serializer.data)


    def post(self, request, event):

        serializer = ProgramSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(event_id=event)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProgramDetail(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, event, orderNumber):

        program = Program.objects.filter(
            event_id=event,
            programOrderNumber=orderNumber
        ).first()

        if not program:
            raise Http404

        return program


    def get(self, request, event, orderNumber):

        program = self.get_object(event, orderNumber)

        serializer = ProgramSerializer(program)

        return Response(serializer.data)


    def put(self, request, event, orderNumber):

        program = self.get_object(event, orderNumber)

        serializer = ProgramSerializer(
            program,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


    def delete(self, request, event, orderNumber):

        program = self.get_object(event, orderNumber)

        program.delete()

        return Response(status=204)