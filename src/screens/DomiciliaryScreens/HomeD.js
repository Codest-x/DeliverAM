import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {theme} from '../../constants/theme';
import {useAuth} from '../../contexts/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {sendUserUbication} from '../../services/authService';

export default function HomeD() {
  const {authData, loading, location} = useAuth();

  useEffect(() => {
    !loading && authData && sendUserUbicationAsync();
  }, []);

  const sendUserUbicationAsync = async () => {
    sendUserUbication({
      userId: authData?.user?._id,
      latitude: location?.latitude,
      longitude: location?.longitude,
      token: authData?.token,
    })
      .then(() => {
        showSuccess('Oye!', 'Hemos actualizado tu ubicación');
      })
      .catch(error => {
        showError(
          'Error Ubicación',
          error.response.data.error || 'No hemos podido enviar tu ubicación',
        );
      });
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
