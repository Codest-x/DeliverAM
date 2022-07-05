import React from 'react';
import Routes from './src/navigation/Route';
import {AuthProvider} from './src/contexts/auth';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
