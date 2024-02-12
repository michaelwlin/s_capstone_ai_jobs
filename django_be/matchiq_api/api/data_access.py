from .mongo import db

def get_all_users():
    users_collection = db['users']
    return list(users_collection.find({}))

def add_user(user_data):
    users_collection = db['users']
    return users_collection.insert_one(user_data).inserted_id