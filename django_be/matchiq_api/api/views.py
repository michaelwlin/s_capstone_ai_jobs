from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from . import scrape_jobs


def index(request):
    # Test
    obj = {
        "greeting": "Hello, world!",
    }
    return JsonResponse(obj)


def db(request):
    # Test
    pass


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
    res = requests.get(url)
    res_text = res.text
    res_bs4 = BeautifulSoup(res_text, "html.parser")

    description = res_bs4.find(
        "div", {"class": "show-more-less-html__markup"}).getText(strip=True)
    categories = res_bs4.findAll(
        "li", {"class": "description__job-criteria-item"})
    seniority_level, employment_type, job_function, industries = categories

    formatted_response = {
        "description": description,
        "qualifications": _qualifications(description),
        "seniority_level": _get_text_from_category(seniority_level),
        "employment_type": _get_text_from_category(employment_type),
        "job_function": _get_text_from_category(job_function),
        "industries": _get_text_from_category(industries)
    }
    return JsonResponse(formatted_response)


def _qualifications(description):
    qualifications_start = description.find("Qualifications")

    if qualifications_start != -1:
        qualifications = description[qualifications_start:]
    else:
        qualifications = ""
    return qualifications


def _get_text_from_category(category):
    return category.text.split("\n\n")[2].strip()
