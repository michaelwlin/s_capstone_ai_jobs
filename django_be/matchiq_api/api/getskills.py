from pymongo import MongoClient
from data import analyze_resume

# Assuming `data` is the result from analyze_resume function
data = analyze_resume(resume)

# MongoDB connection setup (adjust the URI as needed)
client = MongoClient('mongodb://localhost:27017/')
db = client.your_database_name
users_collection = db.users

# User identification (adjust as needed)
user_email = 'user@example.com'

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
