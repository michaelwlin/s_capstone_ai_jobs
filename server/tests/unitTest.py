import requests
import json


base_url = "https://matchiq-api-8d1eb08929d0.herokuapp.com/api"


def login(username, password):
    login_url = f"{base_url}/auth/login"
    credentials = {'userName': username, 'password': password}
    # print("credentials:", credentials)
    response = requests.post(login_url, json=credentials)
    if response.status_code == 200:
        print("Login successful, status:", response.status_code)
        return response.cookies
    else:
        print("Login failed, status:", response.status_code,
              "message:", response.text)
        return None


def send_user_post_request(data):
    users_url = f"{base_url}/users"
    response = requests.post(users_url, json=data)
    if (response.status_code == 401):
        return response.text, response.status_code
    else:
        try:
            json_data = response.json()
        except json.decoder.JSONDecodeError:
            json_data = None
        return json_data, response.status_code

def auth_register_request(data):
    auth_url = f"{base_url}/auth/register"
    response = requests.post(auth_url, json=data)
    if (response.status_code == 401):
        return response.text, response.status_code
    else:
        try:
            json_data = response.json()
        except json.decoder.JSONDecodeError:
            json_data = None
        return json_data, response.status_code



def send_get_request(user_id):
    url = f"{base_url}/{user_id}"
    response = requests.get(url)
    return response.json(), response.status_code




def send_put_request(user_id, data):
    url = f"{base_url}/{user_id}"
    response = requests.put(url, json=data)
    return response.json(), response.status_code




def send_delete_request(user_id):
    url = f"{base_url}/{user_id}"
    response = requests.delete(url)
    return response.json(), response.status_code



test_data = {
    "userName": "john_doe",
    "role": "user",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "lastLogin": "2024-05-05T12:00:00.000Z",
    "skills": ["JavaScript", "React", "Node.js"],
    "resume": [
        {
            "title": "Software Engineer",
            "company": "ABC Inc.",
            "start_date": "2020-01-01",
            "end_date": "2022-12-31",
            "description": "Worked on developing web applications using React and Node.js"
        },
        {
            "title": "Frontend Developer",
            "company": "XYZ Corp.",
            "start_date": "2018-05-01",
            "end_date": "2019-12-31",
            "description": "Designed and implemented user interfaces for various projects"
        }
    ]
}

post_response, post_status_code = send_user_post_request(test_data)
print("POST Response:", post_response)
print("POST Status Code:", post_status_code)
assert post_status_code == 401, "Expected 401 Unauthorized, but received {}".format(
    post_status_code)
print("Test for unauthorized POST passed with status code:", post_status_code)

username = 'test'
bad_password = 'password'
password = 'password1!'

# Test bad login
cookies = login(username, bad_password)
assert cookies is None, "cookies retrieved on bad password"
print("Bad login passed with failed cookie")

# Test good login
cookies = login(username, password)
print(cookies)
assert cookies is not None, "Login failed, no cookies retrieved"
print("Good login passed with cookie received")

# Test GET request
get_response, get_status_code = send_get_request(user_id)
assert get_status_code == 200, "GET request failed"
print("GET Response:", get_response)
print("GET Status Code:", get_status_code)

# Test POST request
post_response, post_status_code = send_user_post_request(test_data)
assert post_status_code == 201, "POST request failed"
print("POST Response:", post_response)
print("POST Status Code:", post_status_code)

# Extract user ID from POST response for subsequent tests
user_id = post_response.get("id")

# Test GET request
get_response, get_status_code = send_get_request(user_id)
assert get_status_code == 200, "GET request failed"
print("GET Response:", get_response)
print("GET Status Code:", get_status_code)

# Test PUT request
put_response, put_status_code = send_put_request(user_id, test_data)
assert put_status_code == 200, "PUT request failed"
print("PUT Response:", put_response)
print("PUT Status Code:", put_status_code)

# Test DELETE request
delete_response, delete_status_code = send_delete_request(user_id)
assert delete_status_code == 204, "DELETE request failed"
print("DELETE Response:", delete_response)
print("DELETE Status Code:", delete_status_code)
