import React from 'react';
import Routes from './src/navigation/Route';
import {AuthProvider} from './src/contexts/auth';
import {LocationProvider} from './src/contexts/location';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

// api key google maps  AIzaSyAjww-YnvLqmT-W4NWS-2OvpGa56CIHrcM

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Routes />
      </LocationProvider>
    </AuthProvider>
  );
}
