import React from 'react';
import Routes from './src/navigation/Route';
import {AuthProvider} from './src/contexts/auth';
import {LocationProvider} from './src/contexts/location';
import {ThemeProvider} from './src/contexts/theme';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocationProvider>
          <Routes />
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
