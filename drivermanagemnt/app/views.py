from django.shortcuts import render
from .models import DriverLog, Profile

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from .serializers import DriverLogSerializer, UserSerializer, ProfileSerializer
import json



def driver_log_view(request):
    logs = DriverLog.objects.all() 
    
    
@csrf_exempt
def driver_log_view(request):
    if request.method == 'GET':
        # Get all logs for the current user
        logs = DriverLog.objects.filter(user=request.user)
        serializer = DriverLogSerializer(logs, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data['user'] = request.user.id  # Associate log with current user
        serializer = DriverLogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        
        # Validate password match
        if data['password'] != data['confirm_password']:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
        
        # Create user
        try:
            user = User.objects.create_user(
                username=data['email'],  # Using email as username
                email=data['email'],
                password=data['password'],
                first_name=data['full_name'].split()[0],
                last_name=' '.join(data['full_name'].split()[1:]) if len(data['full_name'].split()) > 1 else ''
            )
            
            # Create empty profile
            profile = Profile.objects.create(user=user)
            
            return JsonResponse({'success': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        
        user = authenticate(username=data['email'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({
                'id': user.id,
                'email': user.email,
                'full_name': f"{user.first_name} {user.last_name}".strip()
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

@login_required
@csrf_exempt
def user_profile(request):
    if request.method == 'GET':
        # Get user profile
        try:
            profile = Profile.objects.get(user=request.user)
            user_data = {
                'full_name': f"{request.user.first_name} {request.user.last_name}".strip(),
                'email': request.user.email,
                'phone_number': profile.phone_number,
                'company': profile.company
            }
            return JsonResponse(user_data)
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)
    
    elif request.method == 'PUT':
        # Update user profile
        data = JSONParser().parse(request)
        
        try:
            profile = Profile.objects.get(user=request.user)
            
            # Update User model fields
            if 'full_name' in data:
                names = data['full_name'].split()
                request.user.first_name = names[0]
                request.user.last_name = ' '.join(names[1:]) if len(names) > 1 else ''
            
            if 'email' in data:
                request.user.email = data['email']
                request.user.username = data['email']  # If using email as username
            
            request.user.save()
            
            # Update Profile model fields
            if 'phone_number' in data:
                profile.phone_number = data['phone_number']
            
            if 'company' in data:
                profile.company = data['company']
            
            profile.save()
            
            return JsonResponse({'success': 'Profile updated successfully'})
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)    