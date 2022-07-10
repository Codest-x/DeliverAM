import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../constants/theme';
import {useAuth} from '../../contexts/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {sendUserUbication} from '../../services/authService';
import {useLocation} from '../../contexts/location';
import {getAllOrders} from '../../services/ordersService';
import {useSocketIO} from '../../contexts/socketio';
import OrderCard from '../../components/OrderCard';

export default function HomeD({navigation}) {
  const {authData, loading} = useAuth();
  const {locationData} = useLocation();
  const {newOrder, deleteOrder} = useSocketIO();

  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getAllOrders()
      .then(orders => {
        setOrders(orders);
        setRefreshing(false);
      })
      .catch(err => {
        showError('Error', err);
      });
  };

  useEffect(() => {
    !loading && authData && locationData && sendUserUbicationAsync();
  }, [locationData]);

  useEffect(() => {
    setLoadingOrders(true);
    getAllOrders()
      .then(orders => {
        setOrders(orders);
        setLoadingOrders(false);
      })
      .catch(err => {
        showError('Error', err);
      });
  }, [newOrder, deleteOrder]);

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
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView
        contentContainerStyle={styles.HomeScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primaryColor]}
            progressBackgroundColor={theme.colors.accentColor}
          />
        }>
        <View style={styles.OrdersContainer}>
          {!loadingOrders && !refreshing ? (
            orders.length > 0 ? (
              orders.map(
                order =>
                  !order?.delivery && (
                    <OrderCard
                      key={order._id}
                      data={order}
                      delivery={true}
                      onPress={() => {
                        console.log(order?._id);
                        navigation.navigate('Orden', {
                          orderId: order?._id,
                        });
                      }}
                    />
                  ),
              )
            ) : (
              <View style={styles.LoadinContainer}>
                <Image
                  source={require('../../assets/images/dont-move.gif')}
                  style={{
                    width: 300,
                    height: 300,
                    resizeMode: 'contain',
                    marginBottom: -60,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    paddingVertical: 10,
                    fontSize: 20,
                    width: '90%',
                    textAlign: 'center',
                  }}>
                  No tienes ordenes
                </Text>
              </View>
            )
          ) : (
            <View style={styles.LoadinContainer}>
              <Image
                source={require('../../assets/images/dont-move.gif')}
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: 'contain',
                  marginBottom: -60,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  fontSize: 20,
                  width: '90%',
                  textAlign: 'center',
                }}>
                Estamos cargando tus ordenes se paciente si se demora en cargar
                mas de lo normal reinicia la aplicación
              </Text>
              <ActivityIndicator
                size="large"
                color={theme.colors.accentColor}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryColor,
  },
  HomeScroll: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
  },
  OrdersContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  LoadinContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});
