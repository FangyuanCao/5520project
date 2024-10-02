import requests


# This is for unit test backend functions



## test 1 user request registration
print("test 1 registration")
# scenario 1, user provides complete username and password, the function expect to return response with 200
print("# scenario 1, user provides complete username and password, the function expect to return response with 200")
print(f"Expected status code: 200")
print(f"Expected response: {str({'status':'complete'})}")

url = 'http://localhost:3000/registration'


data = {'user_name':'food@mail.com','password':123}
response = requests.post(url, json=data)


print("Status Code:", response.status_code)
print("Response:", response.text)

# scenario 2, user provides incomplete username password, the server should refuse to process the job and return 403 error
print("# scenario 2, user provides incomplete username password, the server should refuse to process the job and return 403 error")
print(f"Expected status code: 403")
print(f"Expected response: {str({'status':'insufficient information'})}")

url = 'http://localhost:3000/registration'

print("response 1")
data = {'user_name':'food@mail.com','password':None}
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)

print("response 2")
data = {'user_name':None,'password':123}
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)

## test 2 login
print("test 2 login")
# scenario 1, user provides correct username and password. Server should response with status 200 and return an authentication token.
print("# scenario 1, user provides correct username and password. Server should response with status 200 and return an authentication token.")
print(f"Expected status code: 200")
print(f"Expected response: an authentication token")

url = 'http://localhost:3000/login'

data = {'user_name':'food@mail.com','password':123}
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)

#scenario 2, user provides a wrong password. Server should not authorized and send a error code 401
print("#scenario 2, user provides a wrong password. Server should not authorized and send a error code 401")
print(f"Expected status code: 401")
print(f"Expected response: an unauthorized status")

url = 'http://localhost:3000/login'

data = {'user_name':'food@mail.com','password':113}
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)


#scenario 3, user provides missing information. Server should not authorized and send a error code 401
print("#scenario 3, user provides missing information. Server should not authorized and send a error code 401")
print(f"Expected status code: 401")
print(f"Expected response: an unauthorized status")

url = 'http://localhost:3000/login'

data = {'user_name':None, 'password':123} #'user_name':'food@mail.com'
response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.text)


## test 3 product display
print("test 3 product display")
#scenario 1, function received a product type request and a number, the function returns a list of that product type
print("#scenario 1, function received a product type request and a number, the function returns a list of that product type")
print(f"Expect status code: 200")
print(f"Expect response: a list with number of product items from type")
url = 'http://localhost:3000/fetch_products'
data = {'type':'food','number':3}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)

#scenario 2, function received a product type but not number, function should returns one product from that type.
print("#scenario 2, function received a product type but not number, function should returns one product from that type.")
print(f"Expect status code: 200")
print(f"Expect response: a product items from type")
url = 'http://localhost:3000/fetch_products'
data = {'type':'beverage'}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)

#scenario 3, function received a request without a product type, function should return a error status with code 400
print("#scenario 3, function received a request without a product type, function should return a error status with code 400")
print(f"Expect status code: 400")
print(f"Expect response: error status to indicate lack of information")
url = 'http://localhost:3000/fetch_products'
data = {'number':9}
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response:", response.text)


#test 4 purchase
print("test 4 purchase")
#scenario 1, client provides authenticate token and subtotal value
print("#scenario 1, client provides authenticate token and subtotal value")
print(f"Expect status code: 200")
print(f"Expect response: a url redirect link for transaction")
url = 'http://localhost:3000/customer_purchasing'
data = {'subtotal':99}
response = requests.post(url, json=data, headers={'Authorization':'test_toke_1234'})
print("Status Code:", response.status_code)
print("Response:", response.text)

#scenario 2, client provides wrong authenticate token 
print("#scenario 2, client provides wrong authenticate token")
print(f"Expect status code: 403")
print(f"Expect response: a error indicate unauthorize")
url = 'http://localhost:3000/customer_purchasing'
data = {'subtotal':99}
response = requests.post(url, json=data,headers={'Authorization':'xxx'})
print("Status Code:", response.status_code)
print("Response:", response.text)


#scenario 3, client not provide subtotal
print("#scenario 3, client not provide subtotal")
print(f"Expect status code: 400")
print(f"Expect response: a error indicate no subtotal")
url = 'http://localhost:3000/customer_purchasing'
data = {'subtotal':None}
response = requests.post(url, json=data, headers={'Authorization':'test_toke_1234'})
print("Status Code:", response.status_code)
print("Response:", response.text)


#scenario 4, client provides no authenticate token
print("#scenario 4, client provides no authenticate token")
print(f"Expect status code: 403")
print(f"Expect response: a error indicate unauthorize")
url = 'http://localhost:3000/customer_purchasing'
data = {'subtotal':99}
response = requests.post(url, json=data,)
print("Status Code:", response.status_code)
print("Response:", response.text)