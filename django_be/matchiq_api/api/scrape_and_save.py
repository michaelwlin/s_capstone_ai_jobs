from scrape_jobs import scrape_utility
from mongo_utils import save_to_mongodb


def main():
    keywords = "Software Developer"
    location = "United States"
    limit = 25

    scraped_data = scrape_utility(keywords, location, limit)

    jobs = scraped_data

    save_to_mongodb(jobs)


if __name__ == "__main__":
    main()
