from django.db import models
# from django.contrib.auth.models import AbstractUser


# Custom User Model
# class User(AbstractUser):
#     username = None
#     full_name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     phone_number = models.CharField(max_length=20, blank=True, null=True)
#     company = models.CharField(max_length=255, blank=True, null=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username', 'full_name']

#     def __str__(self):
#         return self.full_name


#AddLog model
class DriverLog(models.Model):
    date = models.DateField()
    current_location = models.CharField(max_length=255)
    from_location = models.CharField(max_length=255)
    to_location = models.CharField(max_length=255)
    total_miles_driven_today = models.IntegerField()
    total_mileage_today = models.IntegerField()
    vehicle_numbers = models.CharField(max_length=255)
    carrier_name = models.CharField(max_length=255)
    main_office_address = models.TextField()
    home_terminal_address = models.TextField()
    remarks = models.TextField(blank=True, null=True)
    shipping_documents = models.CharField(max_length=255, blank=True, null=True)
    dvi_or_manifest_no = models.CharField(max_length=255, blank=True, null=True)
    current_cycle_used = models.IntegerField()

    def __str__(self):
        return f"Log {self.id} - {self.date}"
