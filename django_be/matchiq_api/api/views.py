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
    obj = {
        "greeting": "Hello, world!",
    }
    return JsonResponse(obj)


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
    if request.method == 'GET':
        try:
            keywords = request.GET['keywords']
            location = request.GET['location']
            limit = request.GET['limit']
        except KeyError:
            return JsonResponse({'error': 'keywords, location, limit are required.'}, status=400)
        response = scrape_jobs.scrape_utility(keywords, location, limit)
        formatted_response = {
            "results": response
        }
        return JsonResponse(formatted_response)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def scrape_description(request):
    if request.method == 'GET':
        try:
            url = request.GET['url']
        except KeyError:
            return JsonResponse({'error': 'url is required.'}, status=400)
        formatted_response = scrape_jobs.get_description(url)
        return JsonResponse(formatted_response)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


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


def wordbank(request):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        logger.info(json_body)
        if not json_body:
            return JsonResponse({'error': 'Missing JSON body'}, status=400)
        try:
            body = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        data = dt()
        wordbank = data.wordbank(json.dumps(body))
        return JsonResponse(wordbank)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_score(request):
    if request.method == 'POST':
        json_body = json.loads(request.body)
        logger.info(json_body)
        if not json_body:
            return JsonResponse({'error': 'Missing JSON body'}, status=400)
        try:
            body = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        resume = request.body.decode("utf-8")
        body = json.loads(resume)
        data = dt()
        try:
            resume_text = body['resume_text']
            job_description = body['job_description']
        except KeyError:
            return JsonResponse({'error': 'resume_text, job_description are required.'}, status=400)
        score = data.get_score(resume_text, job_description)
        return JsonResponse(score)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

