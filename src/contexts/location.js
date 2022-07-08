import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {showError} from '../utils/helperFunctions';

//Create the Auth Context to be used by the App

const LocationContext = createContext();

const LocationProvider = ({children}) => {
  const [locationData, setLocation] = useState();

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    getUserLocationPermissions();
  }, []);

  async function getUserLocationPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DeliverAM App',
          message: 'Necesitamos Aceder a tu ubicacion',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            AsyncStorage.setItem(
              '@UserLocation',
              JSON.stringify(position.coords),
            );
          },
          error => {
            // See error code charts below.
            showError(
              'Error Ubicación',
              'No hemos podido acceder a tu ubicación',
            );
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        showError('Error Ubicación', 'No hemos podido acceder a tu ubicación');
      }
    } catch (err) {
      console.warn(err);
    }
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
