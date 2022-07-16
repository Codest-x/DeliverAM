import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getOrderById} from '../../services/ordersService';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {theme} from '../../constants/theme';
import UserInfoHeader from '../../components/UserInfoHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../contexts/auth';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import {acceptOrder} from '../../services/ordersService';
import {
  sendMessagesToOrder,
  getMessagesByOrder,
} from '../../services/ordersService';
import ChatComponent from '../../components/ChatComponent';

const {width, height} = Dimensions.get('window');

export default function OrderPage({route, navigation}) {
  const {orderId} = route.params;
  const {authData} = useAuth();

  const [order, setOrder] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingOfert, setLoadingOfert] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [orderAccepted, setOrderAccepted] = useState();

  /* socket.on(`newMessageD${orderId}`, data => {
    setNewMessages(data);
  });

  socket.on(`newMessageC${orderId}`, data => {
    setNewMessages(data);
  }); */

  socket.on('newMessage', data => {
    data.orderId === orderId && setNewMessages(data);
  });

  socket.on('orderAccepted', data => {
    setOrderAccepted(data ? data : null);
  });

  const onRefresh = () => {
    setRefreshing(true);
    getOrderById(orderId)
      .then(order => {
        setOrder(order);
        setRefreshing(false);
      })
      .catch(err => {
        showError('Error', err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getOrderById(orderId)
      .then(order => {
        setOrder(order);
        setLoading(false);
      })
      .catch(err => {
        showError('Error', err.response.data.error);
      });
  }, [orderId, orderAccepted]);

  useEffect(() => {
    getMessagesByOrder(orderId).then(messages => {
      setMessages(messages.reverse());
    });
  }, [newMessages]);

  return (
    <SafeAreaView style={styles.OrderContainer}>
      {!loading && !refreshing ? (
        <>
          <ScrollView
            contentContainerStyle={styles.OrderScrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.primaryColor]}
                progressBackgroundColor={theme.colors.accentColor}
              />
            }>
            <UserInfoHeader userInfo={order?.client} />
            <View style={styles.OrderContent}>
              <Text style={styles.NormalText}>
                <Text style={{fontWeight: 'bold'}}>Orden Id:</Text>
                {orderId}
              </Text>
              <View style={styles.OrderPetition}>
                <Text
                  style={[styles.OrderPetitionText]}
                  numberOfLines={showMore ? null : 3}
                  ellipsizeMode="tail">
                  {order?.petition}
                </Text>
                {order?.petition.length > 150 && (
                  <Text
                    onPress={() => setShowMore(!showMore)}
                    style={styles.ShowMore}>
                    {showMore ? 'Ocultar' : 'Ver más'}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.NormalText,
                  {
                    marginTop: 10,
                  },
                ]}>
                <Text style={{fontWeight: 'bold'}}>Oferta Cliente:</Text>
                {order?.clientofert}
              </Text>
            </View>
          </ScrollView>
          {!order?.domiciliary && (
            <View style={[styles.OrderActions]}>
              <ButtonWithLoader
                text="Hacer Oferta"
                isLoading={loadingAccept}
                onPress={() => {}}
                style={styles.Ofertar}
                textColor={theme.colors.accentColor}
              />
              <ButtonWithLoader
                text="Aceptar Domicilio"
                isLoading={loadingAccept}
                onPress={() => {
                  acceptOrder(
                    orderId,
                    authData?.user._id,
                    authData?.token,
                    order?.client?._id,
                  )
                    .then(() => {
                      showSuccess(
                        'Orden Aceptada',
                        'La orden ha sido aceptada',
                      );
                    })
                    .catch(error => {
                      showError('Error Domicilio', error.response.data.error);
                    });
                }}
                style={styles.Aceptar}
              />
            </View>
          )}
          {authData?.user?._id === order?.domiciliary?._id && (
            <View
              style={[
                styles.ChatContainer,
                isChat ? {bottom: 0} : {bottom: -height * 0.6 + 40},
              ]}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.accentColor,
                  width: width,
                  height: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: theme.colors.secondaryColor,
                  borderBottomWidth: 1,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
                onPress={() => setIsChat(!isChat)}>
                <Icon name="chatbox-ellipses-outline" size={32} color="white" />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    marginLeft: 10,
                    fontSize: 18,
                  }}>
                  Chat
                </Text>
              </TouchableOpacity>
              <ChatComponent
                messages={messages}
                onSend={messages => {
                  messages.forEach(message => {
                    sendMessagesToOrder(orderId, {
                      text: message.text,
                      userType: 'Domiciliario',
                    })
                      .then(() => {
                        showSuccess('Exito', 'Mensaje enviado');
                      })
                      .catch(err => {
                        showError('Error', err.response.data.error);
                      });
                  });
                }}
                userId={order?.domiciliary._id}
              />
            </View>
          )}
        </>
      ) : (
        <View style={styles.LoadingContainer}>
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
            Estamos cargando esta orden se paciente si se demora en cargar mas
            de lo normal reinicia la aplicación
          </Text>
          <ActivityIndicator size="large" color={theme.colors.accentColor} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  OrderContainer: {
    flex: 1,
    backgroundColor: theme.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  OrderContent: {
    width: width * 0.95,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  OrderScrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: StatusBar.currentHeight + 10,
    //backgroundColor: theme.colors.secondaryColor,
    width: width,
    height: height * 0.6,
  },
  OrderPetition: {
    width: '100%',
    borderColor: theme.colors.secondaryColor,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 40,
    marginTop: 10,
  },
  OrderPetitionText: {
    color: theme.colors.primaryTextColor,
    fontSize: 18,
    textAlign: 'left',
  },
  ChatContainer: {
    width: '100%',
    height: height * 0.6,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: theme.colors.primaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ShowMore: {
    fontWeight: 'bold',
    color: theme.colors.accentColor,
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 18,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  OrderActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryColor,
  },
  LoadingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  NormalText: {
    color: 'black',
    width: '100%',
    textAlign: 'right',
  },
  Aceptar: {
    width: width * 0.5,
    backgroundColor: theme.colors.accentColor,
    borderRadius: 0,
    borderTopColor: theme.colors.accentColor,
    borderTopWidth: 1,
  },
  Ofertar: {
    width: width * 0.5,
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 0,
    borderTopColor: theme.colors.accentColor,
    borderTopWidth: 1,
  },
});
