export const API_URL = 'http://192.168.201.4:3000';

export const getApiUrl = endpoint => {
  return `${API_URL}${endpoint}`;
};

export const LOGIN = getApiUrl('/auth/login');
export const SIGNUP_CLIENT = getApiUrl('/auth/client/signup');
export const SIGNUP_DOMICILIARY = getApiUrl('/auth/domiciliary/signup');
export const USER_BY_TOKEN = getApiUrl('/auth');
export const GET_ORDERS_BY_USER = getApiUrl('/orders/client/');
export const SEND_DOMICILIARY_UBICATION = getApiUrl(
  '/auth/domiciliary/ubications/',
);

export const GET_DOMICILIARYS_UBICATIONS = getApiUrl(
  '/auth/domiciliary/ubications',
);
