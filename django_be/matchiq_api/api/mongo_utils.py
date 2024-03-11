from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os
from pymongo.errors import BulkWriteError


def save_to_mongodb(data):
    load_dotenv()
    path = os.environ.get("DB_URI", "mongodb://db:27017/matchiq")
    print("saving to mongodb")
    # client = MongoClient("mongodb://db:27017/matchiq")
    client = MongoClient(path)

    collection = client.matchiq.jobs

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


def save_resume_to_mongodb(data):
    load_dotenv()
    path = os.environ.get("DB_URI", "mongodb://db:27017/matchiq")
    print("saving to mongodb")
    client = MongoClient(path)

    collection = client.matchiq.users
    user_filter = {"userName": "testUser"}  # TODO: Update to logged in user
    existing_user = collection.find_one(user_filter)

    resume_entry = {
        "_id": MongoClient.objectId(),
        "resume_data": data,
        "date_added": datetime.now()
    }

    if existing_user:
        collection.update_one(user_filter, {"$push": {"resume": resume_entry}})
        print("Resume inserted into MongoDB.")
    else:
        user = {"userName": "testUser2", "resume": [
            data], "email": "test@gmail.com"}
        result = collection.insert_one(user)

        print(
            f"New user and resume inserted into MongoDB. {result.inserted_id}")

    client.close()
