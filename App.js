import React from 'react';
import Routes from './src/navigation/Route';
import {AuthProvider} from './src/contexts/auth';
import {LocationProvider} from './src/contexts/location';
import {SocketProvider} from './src/contexts/socketio';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <LocationProvider>
          <Routes />
        </LocationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
