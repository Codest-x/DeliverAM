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

const acceptOrder = async (orderId, domiciliary, token, client) => {
  const response = await axios.post(
    `${api.ACCEPT_ORDER}${orderId}`,
    {domiciliary, client},
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
  return response.data;
};

const sendMessagesToOrder = async (orderId, data) => {
  const response = await axios.post(
    `${api.SEND_MESSAGES_TO_ORDER}${orderId}/messages`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

const getMessagesByOrder = async orderId => {
  const response = await axios.get(
    `${api.GET_MESSAGES_BY_ORDER}${orderId}/messages`,
  );
  return response.data.messages;
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
  sendMessagesToOrder,
  getMessagesByOrder,
};
