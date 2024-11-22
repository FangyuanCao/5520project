export default class ApiUtil {
    static URL_IP = 'http://127.0.0.1:5000';
    static URL_ROOT = '';
  
    static API_REGISTRATION = ApiUtil.URL_IP + '/registration';
    static API_LOGIN = ApiUtil.URL_IP + '/login';
    static API_FETCH_PRODUCTS = ApiUtil.URL_IP + '/fetch_products';
    static API_UPDATE_PRODUCTS = ApiUtil.URL_IP + '/update_products';
    static API_CUSTOMER_PURCHASING = ApiUtil.URL_IP + '/customer_purchasing';
    static API_DELETE_USER = ApiUtil.URL_IP + '/delete_user';
}