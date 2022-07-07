import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../constants/theme';
import OrderCard from '../../components/OrderCard';
import MapComponent from '../../components/MapComponent';
import {getAllDomiciliaryUbications} from '../../services/clientService';

export default function HomeC({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [domiciliaryMarkers, setMarkers] = useState([]);

  const onRefresh = () => {
    console.log('refreshing');
  };

  useEffect(() => {
    getAllDomiciliaryUbications().then(ubications => {
      setMarkers(ubications);
    });
  }, []);

  const orders = [
    {
      _id: '62c4f31c43ed9c28d1187eca',
      client: '62c4f2e243ed9c28d1187ebe',
      petition: 'Necesito quien me haga el favor de comprarme unas mandingas',
      domiciliaryofert: 0,
      clientofert: 3500,
      status: 'En Espera',
      domiciliary: null,
      createdAt: '2022-07-06T02:27:40.547Z',
      updatedAt: '2022-07-06T02:27:40.547Z',
    },
    {
      _id: '62c4f31c43ed9c28d1187ecd',
      client: '62c4f2e243ed9c28d1187ebe',
      petition:
        'Necesito quien me haga el favor de comprarme un cuido para gato lasjbdjklasbdkjbajksdbaskjdbkjasbdjkabdjkbasjkdbajksdbjkasbdjkasbdjkasbdkjabsdjkbasjkdsadbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb',
      domiciliaryofert: 0,
      clientofert: 3500,
      status: 'Pendiente',
      domiciliary: null,
      createdAt: '2022-07-06T02:27:40.547Z',
      updatedAt: '2022-07-06T02:27:40.547Z',
    },
    {
      _id: '62c4f31c43ed9c28d1187e2d',
      client: '62c4f2e243ed9c28d1187ebe',
      petition:
        'Necesito quien me haga el favor de comprarme un cuido para gato lasjbdjklasbdkjbajksdbaskjdbkjasbdjkabdjkbasjkdbajksdbjkasbdjkasbdjkasbdkjabsdjkbasjkdsadbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb',
      domiciliaryofert: 0,
      clientofert: 3500,
      status: 'Completado',
      domiciliary: null,
      createdAt: '2022-07-06T02:27:40.547Z',
      updatedAt: '2022-07-06T02:27:40.547Z',
    },
    {
      _id: '62c4f31c43ed9c28d1187df2d',
      client: '62c4f2e243ed9c28d1187ebe',
      petition:
        'Necesito quien me haga el favor de comprarme un cuido para gato lasjbdjklasbdkjbajksdbaskjdbkjasbdjkabdjkbasjkdbajksdbjkasbdjkasbdjkasbdkjabsdjkbasjkdsadbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb',
      domiciliaryofert: 0,
      clientofert: 3500,
      status: 'Cancelado',
      domiciliary: null,
      createdAt: '2022-07-06T02:27:40.547Z',
      updatedAt: '2022-07-06T02:27:40.547Z',
    },
  ];

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <MapComponent domiciliaryMarkers={domiciliaryMarkers} />
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
          {orders.map(order => (
            <OrderCard key={order._id} data={order} />
          ))}
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
});
