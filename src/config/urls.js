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
export const GET_USER_FMC_TOKEN = getApiUrl('/auth/client/fmcToken');
export const GET_DOMICILIARY_FMC_TOKEN = getApiUrl(
  '/auth/domiciliary/fmcToken',
);
export const UPDATE_USER_FMC_TOKEN = getApiUrl('/auth/client/updateFmcToken');
export const UPDATE_DOMICILIARY_FMC_TOKEN = getApiUrl(
  '/auth/domiciliary/updateFmcToken',
);
/* Orders Service */

export const GET_ORDERS_BY_USER = getApiUrl('/orders/client/');
export const GET_ORDERS_BY_DOMICILIARY = getApiUrl('/orders/domiciliary/');
export const ADD_ORDER = getApiUrl('/orders');
export const DELETE_ORDER = getApiUrl('/orders/');
export const GET_ALL_ORDERS = getApiUrl('/orders');
export const GET_ORDER_BY_ID = getApiUrl('/orders/');
export const SEND_MESSAGES_TO_ORDER = getApiUrl('/orders/');
export const GET_MESSAGES_BY_ORDER = getApiUrl('/orders/');

/* Auth Ubication */

export const SEND_DOMICILIARY_UBICATION = getApiUrl(
  '/auth/domiciliary/ubications/',
);

export const GET_DOMICILIARYS_UBICATIONS = getApiUrl(
  '/auth/domiciliary/ubications',
);

/* Domiciliary  */

export const ACCEPT_ORDER = getApiUrl('/orders/domiciliary/');
