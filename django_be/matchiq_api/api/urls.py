from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("scrape", views.scrape, name="scrape"),
    path("scrape_desc", views.scrape_description, name="scrape_description"),
    path("upload_resume", csrf_exempt(views.upload_resume), name="upload_resume"),
    path('match-jobs', views.match_jobs, name='match_jobs'),
]
