import axios from 'axios';
import * as api from '../config/urls';

const getOrdersFromUser = async userId => {
  const response = await axios.get(`${api.GET_ORDERS_BY_USER}${userId}`);
  return response.data;
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

export {getOrdersFromUser, addOrder};
