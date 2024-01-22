from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    # Test
    obj = {
        "greeting" : "Hello, world!"
    }
    return JsonResponse(obj)
