from rest_framework import viewsets
from .models import DriverLog
from .serializers import DriverLogSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

class DriverLogViewSet(viewsets.ModelViewSet):
    queryset = DriverLog.objects.all()
    serializer_class = DriverLogSerializer

# urlpatterns = [
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]