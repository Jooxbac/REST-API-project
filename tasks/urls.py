from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks import views


router = routers.DefaultRouter()

router.register(r"tasks", views.TaskView, "tasks")



urlpatterns = [
    path("api/v1/", include(router.urls)), # Using API versioning
    # path("docs/", include_docs_urls(title="Tasks API")) # Not working, coreapi module is not compatible with new versions of Python (requires Python 3.10 or earlier)
]

# This code generates GET, POST, PUT and DELETE routes