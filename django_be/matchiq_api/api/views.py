from django.http import JsonResponse
from . import scrape_jobs
from ratelimit.decorators import ratelimit
from ratelimit.exceptions import Ratelimited
from django.core.exceptions import PermissionDenied

def index(request):
    # Test
    obj = {
        "greeting": "Hello, world!",
    }
    return JsonResponse(obj)


def db(request):
    # Test
    pass


@ratelimit(key='ip', rate='5/m', method='GET', block=True)
def scrape(request):
    try:
        keywords = request.GET['keywords']
        location = request.GET['location']
        limit = request.GET['limit']

        response = scrape_jobs.scrape_utility(keywords, location, limit)

        formatted_response = {
            "results": response
        }

        return JsonResponse(formatted_response)
    except Ratelimited:
        raise PermissionDenied("This request has been rate-limited.")

@ratelimit(key='ip', rate='5/m', method='GET', block=True)
def scrape_description(request):
    try:
        url = request.GET['url']
        formatted_response = scrape_jobs.get_description(url)

        return JsonResponse(formatted_response)
    except Ratelimited:
        raise PermissionDenied("This request has been rate-limited.")
