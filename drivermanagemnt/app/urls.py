from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DriverLogViewSet
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from . import views

router = DefaultRouter()
router.register(r'logs', DriverLogViewSet)

urlpatterns = [
    path('app/', include(router.urls)),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
