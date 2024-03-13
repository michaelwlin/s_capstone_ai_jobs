from django.http import JsonResponse
from . import scrape_jobs
from .data import DataTools as dt
from . import mongo_utils
import logging
import os
from pymongo import MongoClient
from dotenv import load_dotenv

logger = logging.getLogger(__name__)


def index(request):
    # Test
    obj = {
        "greeting": "Hello, world!",
    }
    return JsonResponse(obj)


def db(request):
    # Test
    pass


def upload_resume(request):
    if request.method == 'POST':
        try:
            resume = request.FILES['resume']
        except KeyError:
            return JsonResponse({'error': 'No resume file provided'}, status=400)

        try:
            data = dt()
            resume_text = data.get_resume_text(resume)
            parsed_resume = data.parse_resume(resume_text)

            response = JsonResponse(parsed_resume)

            mongo_utils.save_resume_to_mongodb(parsed_resume)

            return response

        except Exception as e:
            logger.error(f"Error parsing resume: {str(e)}")
            return JsonResponse({'error': f'Error parsing resume: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def scrape(request):
    keywords = request.GET['keywords']
    location = request.GET['location']
    limit = request.GET['limit']

    response = scrape_jobs.scrape_utility(keywords, location, limit)

    formatted_response = {
        "results": response
    }

    return JsonResponse(formatted_response)


def scrape_description(request):
    url = request.GET['url']
    formatted_response = scrape_jobs.get_description(url)

    return JsonResponse(formatted_response)