from django.urls import path
from .views import RegistrationAPI,export_registrations_pdf

urlpatterns = [
    path("register/", RegistrationAPI.as_view(), name="register"),
    path("export-pdf/", export_registrations_pdf, name="export_pdf"),
]
