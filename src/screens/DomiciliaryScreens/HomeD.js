import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {theme} from '../../constants/theme';
import {useAuth} from '../../contexts/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {sendUserUbication} from '../../services/authService';
import {useLocation} from '../../contexts/location';

export default function HomeD() {
  const {authData, loading} = useAuth();
  const {locationData} = useLocation();

  useEffect(() => {
    !loading && authData && locationData && sendUserUbicationAsync();
  }, [locationData]);

  const sendUserUbicationAsync = async () => {
    locationData?.latitude && locationData?.longitude
      ? sendUserUbication({
          userId: authData?.user?._id,
          latitude: locationData?.latitude,
          longitude: locationData?.longitude,
          token: authData?.token,
        })
          .then(() => {
            showSuccess('Oye!', 'Hemos actualizado tu ubicación');
          })
          .catch(error => {
            showError(
              'Error Ubicación',
              error.response.data.error ||
                'No hemos podido enviar tu ubicación',
            );
          })
      : showError('Error Ubicación', 'No hemos podido enviar tu ubicación');
  };

  return (
    <View style={styles.HomeDomiciliary}>
      <Text style={{color: theme.colors.primaryTextColor}}>
        Bienvenido Eres un Domiciliario
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeDomiciliary: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
