from django.db import models


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


# this handles register and login
class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) 
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    
 # Profile Model (extends User)
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"   