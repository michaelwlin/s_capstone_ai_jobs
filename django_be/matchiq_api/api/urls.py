from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("scrape", views.scrape, name="scrape"),
    path("scrape_desc", views.scrape_description, name="scrape_description"),
    path("upload_resume", csrf_exempt(views.upload_resume), name="upload_resume"),
    path('wordbank', csrf_exempt(views.wordbank), name='wordbank'),
    path('proofread', csrf_exempt(views.proofread), name='proofread'),
    path('enhance', csrf_exempt(views.enhance), name='enhance'),
    path('get_score', csrf_exempt(views.get_score), name='get_score')
]
