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

def match_jobs(request):
    keyword = request.GET.get('keyword', '')
    location = request.GET.get('location', '')
    user_email = 'resumetest@example.com'  # Example user email REMEMBER TO CHANGE!

    load_dotenv()
    db_uri = os.environ.get("DB_URI", "mongodb://db:27017/matchiq")
    client = MongoClient(db_uri)
    
    db = client.matchiq
    user_collection = db.users
    job_collection = db.jobs

    user = user_collection.find_one({'email': user_email})
    if not user:
        return JsonResponse({'error': 'User not found'}, status=404)
    user_skills = user.get('skills', [])
    
    match_query = {}
    if keyword:
        match_query["$or"] = [
            {"title": {"$regex": keyword, "$options": "i"}},
            {"description": {"$regex": keyword, "$options": "i"}}
        ]
    if location:
        match_query["location"] = {"$regex": location, "$options": "i"}
    
    # MongoDB aggregation pipeline for matching and ranking jobs
    pipeline = [
        {"$match": match_query},
        {"$addFields": {
            "locationWeight": {"$cond": [{"$regexMatch": {"input": "$location", "regex": location, "options": "i"}}, 3, 0]},
            "titleWeight": {"$cond": [{"$regexMatch": {"input": "$title", "regex": keyword, "options": "i"}}, 2, 0]},
            "matchingSkillsCount": {"$size": {"$setIntersection": ["$skills", user_skills]}},
        }},
        {"$addFields": {
            "totalWeight": {"$add": ["$locationWeight", "$titleWeight", "$matchingSkillsCount"]}
        }},
        {"$match": {"matchingSkillsCount": {"$gt": 0}}},
        {"$sort": {"totalWeight": -1, "matchingSkillsCount": -1}}
    ]
    ranked_jobs = list(job_collection.aggregate(pipeline))
    
    for job in ranked_jobs:
        job['_id'] = str(job['_id'])
        job['matchScore'] = job.get('matchingSkillsCount', 0)

    return JsonResponse({'jobs': ranked_jobs, 'userSkills': user_skills}, safe=False)