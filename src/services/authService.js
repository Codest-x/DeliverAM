import axios from 'axios';
import * as api from '../config/urls';

const signInService = async (email, _password) => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below

  return await axios.post(
    api.LOGIN,
    {
      email,
      password: _password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

const registerClientService = async data => {
  return await axios.post(api.SIGNUP_CLIENT, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getUserByToken = async token => {
  return await axios.get(api.USER_BY_TOKEN, {
    headers: {
      'x-access-token': token,
    },
  });
};

const registerDomiciliaryService = async data => {
  return await axios.post(api.SIGNUP_DOMICILIARY, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/* export async function forgotPassword(data) {
  try {
    let res = await axios.post(c.FORGOT_PASSWORD, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const form_data = new FormData();
    for (let key in data) form_data.append(key, data[key]);

    let res = await axios.put(
      `${c.UPDATE_PROFILE}/${userId}`,
      form_data,
      options,
    );
    return res.data;
  } catch (e) {
    throw handler(e);
  }
} */

export {
  signInService,
  registerClientService,
  registerDomiciliaryService,
  getUserByToken,
};
