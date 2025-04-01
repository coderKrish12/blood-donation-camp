from rest_framework import serializers
from .models import Registration

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'

    def validate_gender(self, value):

        if value not in dict(Registration.GENDERS):
            raise serializers.ValidationError("Invalid gender value.")
        return value

    def validate(self, data):
        if not data.get("first_time") and not data.get("last_donation_date"):
            raise serializers.ValidationError("Last donation date is required if not a first-time donor.")
        return data
