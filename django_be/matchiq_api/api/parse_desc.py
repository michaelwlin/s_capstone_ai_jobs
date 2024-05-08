from pymongo import MongoClient
from dotenv import load_dotenv
import os
import time
# from openai import OpenAI
import language_tool_python

# def clean_description(description):
#     client = OpenAI()
#     # Use OpenAI to clean up the job description
#     completion = client.chat.completions.create(
#         model="gpt-3.5-turbo-0125",
#         messages=[
#             {"role": "system", "content": "You are a job description reviewer that only reformats job description data under logical headers. You are not responsible for adding or removing any information. You are responsible for making the job description more readable and organized."},
#             {"role": "user", "content": f"Clean up the {description} and reformat the raw job description under common headers."}   
#         ]
#     )
#     time.sleep(20) # Sleep for 20 seconds to avoid rate limiting
#     return completion.choices[0].text

def clean_description(description):
    tool = language_tool_python.LanguageToolPublicAPI('en-US') # use public API
    corrected_description = tool.correct(description)
    return corrected_description

def parse_descriptions():
    # Load env variables and connect to MongoDB
    load_dotenv()
    path = os.environ.get("DB_URI", "mongodb://db:27017/matchiq")
    client = MongoClient(path)
    
    # Access the jobs collection in the matchiq database
    collection = client.matchiq.jobs

    # Initialize page size and page number
    page_size = 50
    page_num = 1

    # Count documents in the collection
    count = collection.count_documents({})

    # While there are more documents to fetch
    while (page_size * (page_num - 1) < count):
        # Compute the number of documents to skip
        skips = page_size * (page_num - 1)

        # Get a cursor for the current page of documents
        cursor = collection.find().skip(skips).limit(page_size)

        for job in cursor:
            if not job['description']:  # if description is empty
                print("Skipping job with empty description")
                continue
            try:
                print(f"Processing job with id: {job['_id']}")
                cleaned_description = clean_description(job['description'])
                print("Updating job description in MongoDB")
                collection.update_one({'_id': job['_id']}, {'$set': {'description': cleaned_description}})
                print(f"Job {job['_id']} description updated successfully")
            except Exception as e:
                print(f"An error occurred while processing the description: {e}")

        # Go to the next page
        page_num += 1

    client.close()

if __name__ == "__main__":
    parse_descriptions()