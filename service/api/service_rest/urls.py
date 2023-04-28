from django.urls import path
from .views import (show_appointment, show_technician, list_appointments, list_technicians)


urlpatterns = [
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<str:vin>/", list_appointments, name="vin_appointments"),
    path("appointments/detail/<int:id>/", show_appointment, name="show_appointment"),
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:id>/", show_technician, name="show_technician"),
]
