import axios from 'axios';
import * as api from '../config/urls';

const getOrdersFromUser = async userId => {
  const response = await axios.get(`${api.GET_ORDERS_BY_USER}${userId}`);
  return response.data;
};

export {getOrdersFromUser};
