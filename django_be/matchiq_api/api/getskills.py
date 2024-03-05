import os
from pymongo import MongoClient
from data import analyze_resume
from dotenv import load_dotenv

load_dotenv()
path = os.environ.get("DB_URL", "mongodb://db:27017/matchiq")
client = MongoClient(path)
db = client.matchiq
users_collection = db.users

user_email = 'resumetest@example.com'

user = users_collection.find_one({'email': user_email})
if not user or 'resume' not in user:
    print("No resume found for the user.")
    exit()

resume_text = user['resume']

data = analyze_resume(resume_text)

update_result = users_collection.update_one(
    {'email': user_email}, 
    {'$set': {
        'skills': data['skills'],
        'experience': data['experience'],
        'other_information': data['other_information']
    }}
)

if update_result.modified_count:
    print("User profile updated successfully.")
else:
    print("User profile update failed or no changes were made.")
