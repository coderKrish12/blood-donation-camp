from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegistrationSerializer
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from .models import Registration
from django.http import HttpResponse
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

class RegistrationAPI(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def export_registrations_pdf(request):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()
    elements.append(Paragraph("Registered Donors", styles['Title']))
    elements.append(Spacer(1, 12))

    # Table data: headers + rows
    data = [
        ["Name", "Phone", "Age", "Gender", "Blood Group", "First-Time", "Last Donation", "Created At"]
    ]

    for reg in Registration.objects.all():
        data.append([
            reg.name,
            reg.phone,
            reg.age,
            reg.gender,
            reg.blood_group,
            "Yes" if reg.first_time else "No",
            reg.last_donation_date.strftime("%Y-%m-%d") if reg.last_donation_date else "N/A",
            reg.created_at.strftime("%Y-%m-%d %H:%M"),
        ])

    # Create the table
    table = Table(data, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.red),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
    ]))

    elements.append(table)
    doc.build(elements)

    buffer.seek(0)
    return HttpResponse(
        buffer,
        content_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="registrations.pdf"'},
    )
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 50, "Registered Donors")

    p.setFont("Helvetica", 10)
    y = height - 80

    for reg in Registration.objects.all():
        line = f"{reg.name} | {reg.phone} | {reg.age} | {reg.gender} | {reg.blood_group} | {'Yes' if reg.first_time else 'No'} | {reg.last_donation_date or 'N/A'}"
        p.drawString(50, y, line)
        y -= 20
        if y < 50:
            p.showPage()
            y = height - 50

    p.save()
    buffer.seek(0)
    return HttpResponse(buffer, content_type='application/pdf', headers={'Content-Disposition': 'attachment; filename="registrations.pdf"'})