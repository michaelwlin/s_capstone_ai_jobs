from pymongo import MongoClient
from dotenv import load_dotenv
import os
from pymongo.errors import BulkWriteError


def save_to_mongodb(data):
    load_dotenv()
    path = os.environ.get("DB_URL", "mongodb://db:27017/matchiq")
    print("saving to mongodb")
    # client = MongoClient("mongodb://db:27017/matchiq")
    db = client.get_database('matchiq')

    collection = db["jobs"]

    try:
        collection.insert_many(data, ordered=False)
        print("All jobs inserted into MongoDB.")
    except BulkWriteError as e:
        # Handle duplicates or error to mongoDB
        for error in e.details['writeErrors']:
            if error['code'] == 11000:  # Duplicate key error
                print(
                    f"Job with URL {error['op']['url']} already exists in MongoDB.")
            else:
                print(f"Error inserting job: {error}")

    client.close()
