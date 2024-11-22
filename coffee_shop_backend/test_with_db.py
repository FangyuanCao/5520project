# from db_manager import *

# DBM = DBManager(base=Base)

# DBM.create_all_tables()

# print("test")

import requests


url = 'http://localhost:5000/update_products'
data = {'name':"coffee", 'type':'beverage', 'price':[1,2,3],'options':['s','m','l'], 'status':True}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)


url = 'http://localhost:5000/fetch_products'
data = {'type':'beverage'}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)

url = 'http://localhost:5000/delete_product'
data = {'name':'coffee'}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)