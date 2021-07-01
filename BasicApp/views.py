from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Picture
from django.core import serializers

# Create your views here.
def index(request):
    return render(request,"BasicApp/index.html")

def picture(request):
    qs = Picture.objects.all()
    data = serializers.serialize('json', qs)
    return JsonResponse({'data':data}, safe=False)

