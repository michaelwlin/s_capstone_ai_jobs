from pymongo import MongoClient
from dotenv import load_dotenv
import os
import time
from openai import OpenAI


def clean_description(description):
    client = OpenAI()
    # Use OpenAI to clean up the job description
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": "You are a job description reviewer that only reformats job description data under logical headers. You are not responsible for adding or removing any information. You are responsible for making the job description more readable and organized."},
            {"role": "user", "content": f"Clean up the {description} and reformat the raw job description under common headers."}   
        ]
    )
    time.sleep(20) # Sleep for 20 seconds to avoid rate limiting
    return completion.choices[0].text

def parse_descriptions():
    # Load env variables and connect to MongoDB
    load_dotenv()
    path = os.environ.get("DB_URI", "mongodb://db:27017/matchiq")
    print("saving to mongodb")
    client = MongoClient(path)
    # Access the jobs collection in the matchiq database
    collection = client.matchiq.jobs

    # Parse description of jobs object in collection
    for job in collection.find():
        if not job['description']:  # if description is empty
            print("Skipping job with empty description")
            continue
        #print("BEFORE:", job['description'], "\n")
        try:
            cleaned_description = clean_description(job['description'])
            #print("AFTER:", cleaned_description, "\n")
            collection.update_one({'_id': job['_id']}, {'$set': {'description': cleaned_description}})
        except Exception as e:
            print(f"An error occurred while processing the description: {e}")

    client.close()

if __name__ == "__main__":
    parse_descriptions()