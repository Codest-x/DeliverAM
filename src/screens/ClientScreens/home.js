import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useAuth} from '../../contexts/auth';
import {theme} from '../../constants/theme';
import OrderCard from '../../components/OrderCard';
import MapView, {Marker} from 'react-native-maps';

export default function Home({navigation}) {
  const {location} = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    console.log('refreshing');
    console.log(location);
  };

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
  ];

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <MapView
        region={{
          latitude: 6.906058,
          longitude: -75.073825,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}
        loadingEnabled={true}
        loadingBackgroundColor={theme.colors.primaryColor}
        loadingIndicatorColor={theme.colors.accentColor}
        mapType="standard"
        style={{width: '100%', height: 400}}>
        <Marker
          coordinate={{
            latitude: location ? location?.latitude : 0,
            longitude: location ? location?.longitude : 0,
          }}
          title="Motocarro"
          description="Hace 5 Min"
          icon={require('../../assets/images/default-profilepic.png')}
        />
      </MapView>
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
