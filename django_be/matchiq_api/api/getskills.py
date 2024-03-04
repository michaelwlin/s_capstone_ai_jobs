from pymongo import MongoClient
from data import analyze_resume
from dotenv import load_dotenv

data = analyze_resume(resume)

load_dotenv()
path = os.environ.get("DB_URL", "mongodb://db:27017/matchiq")
db = client.your_database_name
users_collection = db.users

user_email = 'resumetest@example.com'

# Update user profile
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
