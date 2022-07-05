export const API_URL = 'http://192.168.201.4:3000';

export const getApiUrl = endpoint => {
  return `${API_URL}${endpoint}`;
};

export const LOGIN = getApiUrl('/auth/login');
export const SIGNUP_CLIENT = getApiUrl('/auth/client/signup');
export const SIGNUP_DOMICILIARY = getApiUrl('/auth/domiciliary/signup');
