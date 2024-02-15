import urllib
import time
import requests
from bs4 import BeautifulSoup


def scrape_utility(keywords, location, limit):
    params = {
        "keywords": keywords,
        "location": location
    }
    limit = int(limit)

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

    return jobs


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
