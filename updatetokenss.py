import requests
import json


def get_token(email, password):
    url = "http://localhost:6969/auth/login"
    payload = {"email": email, "password": password}

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json().get("token")
    else:
        print(f"Failed to log in: {response.status_code} - {response.text}")
        return None


def update_user_data(json_file, user_key, new_token):
    try:
        with open(json_file, "r") as f:
            data = json.load(f)

            data["USER_DATA"][user_key]["token"] = new_token

        with open(json_file, "w") as f:
            json.dump(data, f, indent=4)

        print(f"Token for {user_key} updated successfully.")

    except Exception as e:
        print(f"An error occurred while updating the file: {e}")


users = [
    {
        "key": "sulukun",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "plawg",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "kokki31",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "salmi12",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "singu82",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "dosookno",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
    {
        "key": "sofaboy",
        "email": "useremail@mail.com",
        "password": "userpassword",
    },
]

json_file = "secret.json"

for user in users:
    new_token = get_token(user["email"], user["password"])
    if new_token:
        update_user_data(json_file, user["key"], new_token)
