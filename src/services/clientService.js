import * as api from '../config/urls';
import axios from 'axios';

const getAllDomiciliaryUbications = async () => {
  const response = await axios.get(api.GET_DOMICILIARYS_UBICATIONS);

  return response.data.ubications;
};

export {getAllDomiciliaryUbications};
