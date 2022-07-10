export const API_URL = 'http://192.168.201.4:4000';
// LOCAL_URL = 'http://192.168.201.4:4000';
// API_URL = 'https://deliveram-api.herokuapp.com';

export const getApiUrl = endpoint => {
  return `${API_URL}${endpoint}`;
};

/* Authentication */
export const LOGIN = getApiUrl('/auth/login');
export const SIGNUP_CLIENT = getApiUrl('/auth/client/signup');
export const SIGNUP_DOMICILIARY = getApiUrl('/auth/domiciliary/signup');
export const USER_BY_TOKEN = getApiUrl('/auth');

/* Orders Service */

export const GET_ORDERS_BY_USER = getApiUrl('/orders/client/');
export const ADD_ORDER = getApiUrl('/orders');
export const DELETE_ORDER = getApiUrl('/orders/');
export const GET_ALL_ORDERS = getApiUrl('/orders');
export const GET_ORDER_BY_ID = getApiUrl('/orders/');

/* Auth Ubication */

export const SEND_DOMICILIARY_UBICATION = getApiUrl(
  '/auth/domiciliary/ubications/',
);

export const GET_DOMICILIARYS_UBICATIONS = getApiUrl(
  '/auth/domiciliary/ubications',
);
