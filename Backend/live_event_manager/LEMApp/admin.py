from django.contrib import admin
from .models import*
# Register your models here.

class EventView(admin.ModelAdmin):
    list_display = ('eventName',)

class ProgramView(admin.ModelAdmin):
    list_display = ('event', 'programName', 'programOrderNumber')

admin.site.register(Event, EventView)
admin.site.register(Program, ProgramView)