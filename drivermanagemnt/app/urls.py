from django.urls import path
from . import views

urlpatterns = [
    path('', views.driver_log_view, name='driver_log'), 
    
    
    # creating API endpoints
    path('api/logs/<int:pk>/', views.driver_log_detail, name='driver_log_detail'),
    path('api/register/', views.register_user, name='register_user'),
    path('api/login/', views.login_user, name='login_user'),
    path('api/profile/', views.user_profile, name='user_profile'),

]
