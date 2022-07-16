import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  ActivityIndicator,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../constants/theme';
import OrderCard from '../../components/OrderCard';
import MapComponent from '../../components/MapComponent';
import {getAllDomiciliaryUbications} from '../../services/clientService';
import {getOrdersFromUser} from '../../services/ordersService';
import {useAuth} from '../../contexts/auth';
import socket from '../../utils/utils';

export default function HomeC({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [domiciliaryMarkers, setMarkers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOrder, setNewOrder] = useState();
  const [deleteOrder, setDeleteOrder] = useState();
  const [newUbication, setNewUbication] = useState();

  const {authData} = useAuth();
  const {height} = Dimensions.get('window');

  socket.on('orderSaved', data => {
    data.client === authData?.user?._id && setNewOrder(data ? data : null);
  });

  socket.on('orderDeleted', data => {
    data.client === authData?.user?._id && setDeleteOrder(data ? data : null);
  });

  socket.on('updateUbication', data => {
    setNewUbication(data ? data : null);
  });

  const onRefresh = () => {
    setRefreshing(true);
    getOrdersFromUser(authData?.user?._id).then(({orders}) => {
      if (orders.length > 3) {
        setOrders(orders.slice(0, 3));
      } else {
        setOrders(orders);
      }
      setRefreshing(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getOrdersFromUser(authData?.user?._id).then(({orders}) => {
      if (orders.length > 3) {
        setOrders(orders.slice(0, 3));
      } else {
        setOrders(orders);
      }
      setLoading(false);
    });
  }, [newOrder, deleteOrder]);

  useEffect(() => {
    getAllDomiciliaryUbications().then(ubications => {
      setMarkers(ubications);
    });
  }, [newUbication]);

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <MapComponent
        domiciliaryMarkers={domiciliaryMarkers}
        height={orders.length >= 3 ? height * 0.5 : height * 0.6}
      />
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
          {!loading && !refreshing ? (
            orders.length > 0 ? (
              orders.map(order => (
                <OrderCard
                  key={order._id}
                  data={order}
                  onPress={() => {
                    navigation.navigate('Orden', {orderId: order._id});
                  }}
                />
              ))
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
