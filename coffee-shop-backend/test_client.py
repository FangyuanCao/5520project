import requests


url = 'http://localhost:3000/registration'

data = {'user_name':'food@mail.com','password':123}
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)