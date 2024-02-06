from django.shortcuts import render
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
import urllib
import time

def index(request):
    # Test
    obj = {
        "greeting" : "Hello, world!",
    }
    return JsonResponse(obj)

def db(request):
    #Test
    pass

def scrape(request):
    params = {
        "keywords" : request.GET['keywords'],
        "location" : request.GET['location']
    }
    limit = int(request.GET['limit'])

    jobs = []
    url_params = urllib.parse.urlencode(params)
    for i in range(0, limit, 25):
        url = "https://www.linkedin.com/jobs/search/?{}&start={}".format(url_params, i)
        res = requests.get(url)
        res_text = res.text
        res_bs4 = BeautifulSoup(res_text, "html.parser")
        # titles
        titles = res_bs4.find_all("h3", {"class" : "base-search-card__title"})
        companies = res_bs4.find_all("h4", {"class" : "base-search-card__subtitle"})
        urls = res_bs4.find_all("a", {"class" : "base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]"})
        for i, title in enumerate(titles):
            posting = {
                "title": title.text.strip(),
                "company" : companies[i].text.strip(),
                "url" : urls[i]['href'].strip()
            }
            jobs.append(posting)
        time.sleep(1)
    our_res = {
        "results" : jobs
    }
    return JsonResponse(our_res)
