from django.shortcuts import render
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import urllib
import time


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
    params = {
        "keywords": request.GET['keywords'],
        "location": request.GET['location']
    }
    limit = int(request.GET['limit'])

    jobs = []
    url_params = urllib.parse.urlencode(params)

    for job in range(0, limit, 25):
        url = "https://www.linkedin.com/jobs/search/?{}&start={}".format(
            url_params, job)

        res = requests.get(url)
        res_text = res.text

        res_bs4 = BeautifulSoup(res_text, "html.parser")

        jobs.extend(_extract_job_info(res_bs4))
        time.sleep(1)

    formatted_response = {
        "results": jobs
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


def _extract_job_info(res_bs4):
    titles = res_bs4.find_all("h3", {"class": "base-search-card__title"})
    companies = res_bs4.find_all(
        "h4", {"class": "base-search-card__subtitle"})
    urls = res_bs4.find_all(
        "a", {"class": "base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]"})

    return [
        {
            "title": title.text.strip(),
            "company": company.text.strip(),
            "url": url['href'].strip(),
        }
        for title, company, url in zip(titles, companies, urls)
    ]


def _qualifications(description):
    qualifications_start = description.find("Qualifications")

    if qualifications_start != -1:
        qualifications = description[qualifications_start:]
    else:
        qualifications = ""
    return qualifications


def _get_text_from_category(category):
    return category.text.split("\n\n")[2].strip()
