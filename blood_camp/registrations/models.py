from django.db import models

class Registration(models.Model):
    BLOOD_GROUPS = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]
    GENDERS = [('male', 'male'), ('female', 'female')]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDERS)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUPS)
    first_time = models.BooleanField(default=True)
    last_donation_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
