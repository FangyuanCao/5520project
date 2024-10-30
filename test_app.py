import pytest
# from coffee_shop_backend import *
from app import *
# from db_manager import *

import requests


# This is for unit test backend functions
@pytest.fixture
def client():
    # Set up the Flask test client
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


## test 1 user request registration
# print("test 1 registration")
# scenario 1, user provides complete username and password, the function expect to return response with 200
def test_registration_success(client):
    print("# scenario 1, user provides complete username and password, the function expect to return response with 200")
    print(f"Expected status code: 200")
    print(f"Expected response: {str({'status':'complete'})}")
    data = {'user_name':'food@mail.com','password':123}
    response = client.post('/registration',json=data)
    
    assert response.status_code == 200
    assert response.json == {'status': 'complete'}



# scenario 2, user provides incomplete username password, the server should refuse to process the job and return 403 error
def test_registration_missing_data(client):
    print("# scenario 2, user provides incomplete username password, the server should refuse to process the job and return 403 error")
    print(f"Expected status code: 403")
    print(f"Expected response: {str({'status':'insufficient information'})}")

    print("response 1")
    data = {'user_name':'food@mail.com'}
    response = client.post('/registration',json=data)

    assert response.status_code == 403
    assert response.json == {'status': 'insufficient information'}

## test 2 login
def test_login_success(client):

    print("test 2 login")
    # scenario 1, user provides correct username and password. Server should response with status 200 and return an authentication token.
    print("# scenario 1, user provides correct username and password. Server should response with status 200 and return an authentication token.")
    print(f"Expected status code: 200")
    print(f"Expected response: an authentication token")


    data = {'user_name':'food@mail.com','password':123}
    response = client.post('/login', json=data)

    assert response.status_code == 200
    assert 'authentication' in response.json
    assert response.json['status'] == 'complete'

#scenario 2, user provides a wrong password. Server should not authorized and send a error code 401
def test_login_failure(client):
    print("#scenario 2, user provides a wrong password. Server should not authorized and send a error code 401")
    print(f"Expected status code: 401")
    print(f"Expected response: an unauthorized status")

    data = {'user_name':'food@mail.com','password':113}
    response = client.post('/login', json=data)

    assert response.status_code == 401
    assert response.json == {'status': 'unauthorized'}

#scenario 3, user provides missing information. Server should not authorized and send a error code 401
def test_login_missing_data(client):
    print("#scenario 3, user provides missing information. Server should not authorized and send a error code 401")
    print(f"Expected status code: 401")
    print(f"Expected response: an unauthorized status")

    data = {'user_name':None, 'password':123} #'user_name':'food@mail.com'
    response = client.post('/login', json=data)

    assert response.status_code == 401
    assert response.json == {'status': 'unauthorized'}



def test_delete_user_success(client):
    print("# scenario 1.1, user provides complete username and password, the function expect to return response with 200")
    print(f"Expected status code: 200")
    print(f"Expected response: {str({'status':'complete'})}")
    data = {'user_name':'food@mail.com','password':123}
    response = client.post('/delete_user',json=data)
    
    assert response.status_code == 200
    assert response.json == {'status': 'complete'}
def test_delete_user_no_user_found(client):
    print("# scenario 1.2, user provides complete username and password, the function expect to return response with 200")
    print(f"Expected status code: 401")
    print(f"Expected response: {str({'status':'password is not sufficient or user not exist'})}")
    data = {'user_name':'food@mail.com','password':123}
    response = client.post('/delete_user',json=data)
    
    assert response.status_code == 401
    # assert response.json == {'status': 'password is not sufficient or user not exist'}

## test 3 product display
def test_product_display_success(client):
    print("test 3 product display")
    #scenario 1, function received a product type request and a number, the function returns a list of that product type
    print("#scenario 1, function received a product type request and a number, the function returns a list of that product type")
    print(f"Expect status code: 200")
    print(f"Expect response: a list with number of product items from type")
    
    data = {'type':'food','number':3}
    response = client.post('/fetch_products', json=data)

    assert response.status_code == 200
    assert 'product_list' in response.json
    

#scenario 2, function received a product type but not number, function should returns one product from that type.
def test_product_display_one_product(client):
    print("#scenario 2, function received a product type but not number, function should returns one product from that type.")
    print(f"Expect status code: 200")
    print(f"Expect response: a product items from type")
    
    data = {'type':'beverage'}
    response = client.post('/fetch_products', json=data)

    assert response.status_code == 200
    assert 'product_list' in response.json

#scenario 3, function received a request without a product type, function should return a error status with code 400
def test_product_display_missing_product_type(client):
    print("#scenario 3, function received a request without a product type, function should return a error status with code 400")
    print(f"Expect status code: 400")
    print(f"Expect response: error status to indicate lack of information")
    
    data = {'number':9}
    response = client.post('/fetch_products', json=data)

    assert response.status_code == 400
    assert response.json['status'] == 'no type specified'
    


#test 4 purchase
def test_purchase_redirect_successful(client):
    print("test 4 purchase")
    #scenario 1, client provides authenticate token and subtotal value
    print("#scenario 1, client provides authenticate token and subtotal value")
    print(f"Expect status code: 200")
    print(f"Expect response: a url redirect link for transaction")
    
    data = {'subtotal':99}
    response = client.post('/customer_purchasing', json=data, headers={'Authorization':'test_toke_1234'})

    assert response.status_code == 200
    assert 'url' in response.json

#scenario 2, client provides wrong authenticate token 
def test_purchase_redirect_wrong_authentication_token(client):
    print("#scenario 2, client provides wrong authenticate token")
    print(f"Expect status code: 403")
    print(f"Expect response: a error indicate unauthorize")
    
    data = {'subtotal':99}
    response = client.post('/customer_purchasing', json=data,headers={'Authorization':'xxx'})
    

    assert response.status_code == 403


#scenario 3, client not provide subtotal
def test_purchase_redirect_missing_subtotal(client):

    print("#scenario 3, client not provide subtotal")
    print(f"Expect status code: 400")
    print(f"Expect response: a error indicate no subtotal")
    
    data = {'subtotal':None}
    response = client.post('/customer_purchasing', json=data, headers={'Authorization':'test_toke_1234'})
    
    assert response.status_code == 400


#scenario 4, client provides no authenticate token
def test_purchase_redirect_missing_token(client):
    print("#scenario 4, client provides no authenticate token")
    print(f"Expect status code: 403")
    print(f"Expect response: a error indicate unauthorize")
    
    data = {'subtotal':99}
    response = client.post('/customer_purchasing', json=data,)
    

    assert response.status_code == 403