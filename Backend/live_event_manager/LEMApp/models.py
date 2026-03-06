from django.db import models
from django.utils import timezone
# Create your models here.
'''Username: admin
Email address: harshsikarwar2005@gmail.com
Password: harsh@2005'''
class Event(models.Model):
    eventName = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    startTime = models.DateTimeField(default=timezone.now)
    endTime = models.DateTimeField(blank=True, null=True)

PROGRAM_STATUS = [
    ("live", "LIVE"),
    ("upcoming", "UPCOMING"),
    ("end", "END"),
]
class Program(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    programOrderNumber = models.IntegerField()
    programName = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(default="upcoming" ,max_length=10, choices=PROGRAM_STATUS)