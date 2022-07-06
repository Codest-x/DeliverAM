import React from 'react';
import Routes from './src/navigation/Route';
import {AuthProvider} from './src/contexts/auth';
import {enableLatestRenderer} from 'react-native-maps';
import RNLocation from 'react-native-location';

enableLatestRenderer();

// api key google maps  AIzaSyAjww-YnvLqmT-W4NWS-2OvpGa56CIHrcM

RNLocation.configure({
  distanceFilter: 50, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
});

RNLocation.requestPermission({
  ios: 'whenInUse',
  android: {
    detail: 'fine',
    rationale: {
      title: 'Necesitamos Acceder a tu ubicación',
      message:
        'Usaremos tu ubicacion para que las demas personas accedan a tu servicio',
      buttonPositive: 'OK',
      buttonNegative: 'Cancelar',
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
