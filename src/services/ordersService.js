import axios from 'axios';
import * as api from '../config/urls';

const getOrdersFromUser = async userId => {
  const response = await axios.get(`${api.GET_ORDERS_BY_USER}${userId}`);
  return response.data;
};

const getOrdersFromDomiciliary = async (domiciliaryId, token) => {
  const response = await axios.get(
    `${api.GET_ORDERS_BY_DOMICILIARY}${domiciliaryId}`,
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(api.GET_ALL_ORDERS);
  return response.data.orders;
};

const getOrderById = async orderId => {
  const response = await axios.get(`${api.GET_ORDER_BY_ID}${orderId}`);
  return response.data.order;
};

const addOrder = async (order, token) => {
  const {petition, clientofert, client} = order;

  if (petition.length < 1 && clientofert.length < 1)
    throw new Error('Petición o oferta vacía');

  const priceConverted = parseInt(clientofert);

  if (isNaN(priceConverted)) throw new Error('El precio debe ser numerico');

  const response = await axios.post(
    api.ADD_ORDER,
    {
      petition,
      clientofert: priceConverted,
      client,
    },
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
  return response.data;
};

const acceptOrder = async (orderId, domiciliary, token) => {
  const response = await axios.post(
    `${api.ACCEPT_ORDER}${orderId}`,
    {domiciliary},
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
  return response.data;
};

const deleteOrderService = async (orderId, token) => {
  const response = await axios.delete(`${api.DELETE_ORDER}${orderId}`, {
    headers: {
      'x-access-token': token,
    },
  });
  return response.data;
};

export {
  getOrdersFromUser,
  addOrder,
  deleteOrderService,
  getAllOrders,
  getOrderById,
  acceptOrder,
  getOrdersFromDomiciliary,
};
