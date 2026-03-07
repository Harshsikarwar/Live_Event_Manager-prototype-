from django.urls import path, include
from .views import EventListnCreate, EventDetail, ProgramListnCreate, ProgramDetail
urlpatterns = [
    path("event/",EventListnCreate.as_view(), name="event_list_and_create"),
    path("event/<int:pk>/", EventDetail.as_view(), name="event_detail"),
    path("event/<int:event>/program/",ProgramListnCreate.as_view(), name="program_list_and_create"),
    path("event/<int:event>/program/<int:orderNumber>/", ProgramDetail.as_view(), name="program_detail"),
]
