import React, {createContext, useState, useContext, useEffect} from 'react';
import {showError} from '../utils/helperFunctions';
import {io} from 'socket.io-client';
import {API_URL} from '../config/urls';

const socket = io(API_URL);

const SocketContext = createContext();

const SocketProvider = ({children}) => {
  const [newOrder, setNewOrder] = useState();
  const [deleteOrder, setDeleteOrder] = useState();

  socket.on('orderSaved', data => {
    setNewOrder(data ? data : null);
  });

  socket.on('orderDeleted', data => {
    setDeleteOrder(data ? data : null);
  });

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <SocketContext.Provider
      value={{
        newOrder,
        deleteOrder,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useSocketIO() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocketIO must be used within an SocketProvider');
  }

  return context;
}

export {useSocketIO, SocketContext, SocketProvider};
