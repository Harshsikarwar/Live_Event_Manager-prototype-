from django.urls import path, include
from .views import*
urlpatterns = [
    path("event/",EventListnCreate.as_view(), name="event_list_and_create"),
    path("event/<int:id>", EventDetail.as_view(), name="event_detail"),
    path("event/<int:event>/program/",ProgramListnCreate.as_view(), name="event_list_and_create"),
    path("event/<int:event>/program/<int:orderNumber>", ProgramDetail.as_view(), name="event_detail"),
]
