from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("scrape", views.scrape, name="scrape"),
    path("scrape_desc", views.scrape_description, name="scrape_description")
]
