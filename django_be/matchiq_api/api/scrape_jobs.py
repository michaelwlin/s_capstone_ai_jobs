import urllib
import time
import requests
from bs4 import BeautifulSoup
from retrying import retry
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

LINKEDIN_SEARCH_URL = "https://www.linkedin.com/jobs/search/?{}&start={}"
JOB_CARD_TITLE_CLASS = "base-search-card__title"
JOB_CARD_COMPANY_CLASS = "base-search-card__subtitle"
JOB_CARD_URL_CLASS = "base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]"


def retry_if_rate_limit_error(exception):
    return isinstance(exception, requests.HTTPError) and exception.response.status_code == 429


@retry(retry_on_exception=retry_if_rate_limit_error, wait_fixed=3000, stop_max_attempt_number=3)
def make_request(url):
    logger.info(f"Making request to {url}")
    res = requests.get(url)
    res.raise_for_status()
    return res


def scrape_utility(keywords, location, limit):
    params = {
        "keywords": keywords,
        "location": location
    }
    limit = int(limit)

    jobs = []
    url_params = urllib.parse.urlencode(params)

    for job in range(0, limit, 25):
        url = LINKEDIN_SEARCH_URL.format(
            url_params, job)

        try:
            logger.info(f"Scraping job for {url}")
            res = make_request(url)
        except requests.RequestException as e:
            logger.error(f"Error making request to {url}: {e}")
            continue

        res_bs4 = BeautifulSoup(res.text, "html.parser")

        jobs.extend(_extract_job_info(res_bs4))
        time.sleep(1)

    return jobs


def get_description(url):
    try:
        logger.info(f"Scraping description for {url}")
        res = make_request(url)
    except requests.RequestException as e:
        logger.error(f"Error making request to {url}: {e}")
        return {}

    res_bs4 = BeautifulSoup(res.text, "html.parser")
    time.sleep(1)
    return _extract_description(res_bs4)


def _extract_job_info(res_bs4):
    titles = res_bs4.find_all("h3", {"class": JOB_CARD_TITLE_CLASS})
    companies = res_bs4.find_all(
        "h4", {"class": JOB_CARD_COMPANY_CLASS})
    urls = res_bs4.find_all(
        "a", {"class": JOB_CARD_URL_CLASS})

    return [
        {
            "title": title.text.strip(),
            "company": company.text.strip(),
            "url": url['href'].strip(),
            **get_description(url['href'])
        }
        for title, company, url in zip(titles, companies, urls)
    ]


def _extract_description(res_bs4):
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

    return formatted_response


def _qualifications(description):
    qualifications_start = description.find("Qualifications")

    if qualifications_start != -1:
        qualifications = description[qualifications_start:]
    else:
        qualifications = ""
    return qualifications


def _get_text_from_category(category):
    return category.text.split("\n\n")[2].strip()
