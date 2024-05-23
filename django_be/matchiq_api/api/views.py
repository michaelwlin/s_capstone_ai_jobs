from django.http import JsonResponse
from . import scrape_jobs
from .data import DataTools as dt
from . import mongo_utils
import logging
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import json

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
            userID = request.POST['userID']
        except KeyError:
            return JsonResponse({'error': 'No resume file provided'}, status=400)

        try:
            data = dt()
            resume_text = data.get_resume_text(resume)
            parsed_resume = data.parse_resume(resume_text)

            response = JsonResponse(parsed_resume)

            mongo_utils.save_resume_to_mongodb(parsed_resume, userID)

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


def proofread(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            resume_text = json_data.get('resume_text', '').strip()
            if not resume_text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            data = dt()
            enhanced_text = data.proofread(resume_text)
            return JsonResponse(enhanced_text)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            logger.error(
                f"Error proofreading text: {type(e).__name__} - {str(e)}")
            return JsonResponse({'error': f'Error proofreading text: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def enhance(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            resume_text = json_data.get('resume_text', '').strip()
            if not resume_text:
                return JsonResponse({'error': 'No text provided'}, status=400)

            data = dt()
            enhanced_text = data.enhance(resume_text)
            return JsonResponse(enhanced_text)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            logger.error(
                f"Error proofreading text: {type(e).__name__} - {str(e)}")
            return JsonResponse({'error': f'Error enhancing text: {str(e)}'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def stringify_resume_obj(resume):
    result_string = ""
    for key, value in resume.items():
        if isinstance(value, dict):
            result_string += stringify_resume_obj(value) + " "
        else:
            result_string += str(value) + " "
    print(result_string)
    return result_string


def wordbank(request):
    resume = request.body.decode("utf-8")
    body = json.loads(resume)
    data = dt()
    wordbank = data.wordbank(json.dumps(body))
    return JsonResponse(wordbank)

def get_score(request):
    resume = request.body.decode("utf-8")
    body = json.loads(resume)
    data = dt()
    score = data.get_score(body['resume_text'], body['job_desc'])
    return JsonResponse(score)