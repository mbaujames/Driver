from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('', lambda request: HttpResponseRedirect('/app/')),  # Redirect to Admin Panel

]
