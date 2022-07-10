import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

const {width} = Dimensions.get('window');

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export default function OrderCard({
  data,
  children,
  actionButtons,
  delivery,
  onPress,
}) {
  const getKValue = value => {
    if (value < 1000) {
      return value;
    } else if (value < 1000000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return `${(value / 1000000).toFixed(2)}M`;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.CardOrder,
        data.status === 'En Espera' &&
          !delivery && {
            borderBottomColor: theme.colors.accentColor,
            shadowColor: theme.colors.accentColor,
          },
        data.status === 'Pendiente' &&
          !delivery && {
            borderBottomColor: 'red',
            shadowColor: 'red',
          },
        data.status === 'Completado' &&
          !delivery && {
            borderBottomColor: 'green',
            shadowColor: 'green',
          },
        data.status === 'Cancelado' &&
          !delivery && {
            borderBottomColor: 'gray',
            shadowColor: 'gray',
          },
      ]}>
      {children}
      <Text style={styles.Petition}>{data.petition}</Text>
      <View style={styles.Oferts}>
        <View
          style={[
            styles.OfertPrice,
            {marginRight: data?.domiciliaryofert != 0 ? 10 : 0},
          ]}>
          <Text style={styles.OfertTitle}>Oferta Cliente:</Text>
          <Text style={styles.Text}>{getKValue(data.clientofert)}</Text>
        </View>

        {data?.domiciliaryofert != 0 && (
          <View style={styles.OfertPrice}>
            <Text style={styles.OfertTitle}>Oferta Domiciliario:</Text>
            <Text style={styles.Text}>{getKValue(data.domiciliaryofert)}</Text>
          </View>
        )}
      </View>
      <View style={styles.OrderDetails}>
        <View style={styles.OrderStatus}>
          <Text style={[styles.Text, {fontWeight: 'bold'}]}>Estado: </Text>
          <Text style={styles.Text}>{data.status}</Text>
        </View>
        <Text style={styles.Text}>Orden Id: {data._id}</Text>
      </View>
      {actionButtons}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CardOrder: {
    width: width - 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    borderBottomWidth: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Text: {
    color: theme.colors.primaryTextColor,
  },
  Petition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primaryTextColor,
    marginBottom: 10,
    maxHeight: 74,
  },
  Oferts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  OfertPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  OfertTitle: {
    color: theme.colors.primaryTextColor,
    fontWeight: 'bold',
    marginRight: 2,
  },
  OrderDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  OrderStatus: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
