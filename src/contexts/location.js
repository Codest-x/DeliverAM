import React, {createContext, useState, useContext, useEffect} from 'react';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Create the Auth Context to be used by the App

const LocationContext = createContext();

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

const LocationProvider = ({children}) => {
  const [locationData, setLocation] = useState();

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    getUserLocationPermissions();
  }, []);

  async function getUserLocationPermissions() {
    RNLocation.checkPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(location => {
          AsyncStorage.setItem('@UserLocation', JSON.stringify(location[0]));
          setLocation(location[0]);
        });
      }
    });
  }

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <LocationContext.Provider
      value={{
        locationData,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider');
  }

  return context;
}

export {useLocation, LocationContext, LocationProvider};
