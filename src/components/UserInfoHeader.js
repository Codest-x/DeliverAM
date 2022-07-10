import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

const {width, height} = Dimensions.get('window');

export default function UserInfoHeader({userInfo}) {
  const getFirstFromName = fullname => {
    return fullname.split(' ')[0];
  };

  return (
    <View style={styles.UserInfoHeaderContainer}>
      <Image
        style={styles.UserPicture}
        source={
          userInfo && userInfo?.picture !== ''
            ? {uri: userInfo?.picture}
            : require('../assets/images/default-profilepic.jpg')
        }
      />
      <View style={styles.UserInfo}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              styles.UserNames,
              {
                marginRight: 5,
              },
            ]}>
            {userInfo?.nombres
              ? getFirstFromName(userInfo.nombres)
              : 'Cargando'}
          </Text>
          <Text style={styles.UserNames}>
            {userInfo?.apellidos
              ? getFirstFromName(userInfo.apellidos)
              : 'Datos'}
          </Text>
        </View>
        <Text style={styles.UserContact}>{userInfo?.telefono}</Text>
        {userInfo?.direccion && (
          <Text style={styles.UserContact}>{userInfo?.direccion}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  UserInfoHeaderContainer: {
    width: width * 0.95,
    height: height * 0.12,
    backgroundColor: theme.colors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  UserPicture: {
    width: 80,
    height: 80,
    borderRadius: width * 0.1,
    backgroundColor: '#fff',
    marginRight: width * 0.05,
  },
  UserInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width * 0.6,
  },
  UserNames: {
    color: theme.colors.primaryTextColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  UserContact: {
    color: theme.colors.primaryTextColor,
    fontSize: 14,
  },
});
