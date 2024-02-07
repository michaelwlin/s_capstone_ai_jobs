from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'jobs', views.JobViewSet)
router.register(r'applications', views.ApplicationViewSet)

urlpatterns = [

]


urlpatterns = [
    path("", views.index, name="index"),
    path("scrape", views.scrape, name="scrape"),
    path('api/', include(router.urls)),
    path("scrape_desc", views.scrape_description, name="scrape_description")
]
