import {io} from 'socket.io-client';
import {API_URL} from '../config/urls';

export default socket = io(API_URL);
