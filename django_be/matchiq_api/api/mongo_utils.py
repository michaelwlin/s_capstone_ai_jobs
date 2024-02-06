from pymongo import MongoClient
from dotenv import load_dotenv
import os


def save_to_mongodb(data):
    load_dotenv()
    path = os.environ.get("DB_URL", "mongodb://db:27017/matchiq")

    client = MongoClient(path)
    db = client.get_database('matchiq')
    print(db)
    collection = db["jobs"]

    collection.insert_many(data)

    client.close()
