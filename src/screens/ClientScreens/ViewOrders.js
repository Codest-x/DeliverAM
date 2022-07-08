import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import OrderCard from '../../components/OrderCard';
import {theme} from '../../constants/theme';
import {getOrdersFromUser} from '../../services/ordersService';
import {useAuth} from '../../contexts/auth';

export default function ViewOrders() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, SetOrders] = useState([]);

  const {authData} = useAuth();

  const onRefresh = () => {
    setRefreshing(true);
    getOrdersFromUser(authData?.user?._id).then(({orders}) => {
      SetOrders(orders);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getOrdersFromUser(authData?.user?._id).then(({orders}) => {
      SetOrders(orders);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.OrdersContainer}>
      <ScrollView
        contentContainerStyle={styles.OrdersScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primaryColor]}
            progressBackgroundColor={theme.colors.accentColor}
          />
        }>
        {!loading && !refreshing ? (
          <View style={styles.OrdersContent}>
            {orders &&
              orders.map(order => <OrderCard key={order._id} data={order} />)}
          </View>
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
            <ActivityIndicator size="large" color={theme.colors.accentColor} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  OrdersContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryColor,
  },
  OrdersScroll: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  OrdersContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
  LoadinContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
});
