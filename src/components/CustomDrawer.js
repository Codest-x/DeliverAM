import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MenuButton from './ButtonMenu';
import {theme} from '../constants/theme';
import {useAuth} from '../contexts/auth';

export default function CustomDrawer(props) {
  const {authData} = useAuth();
  const auth = useAuth();

  const getFirstFromName = fullname => {
    return fullname.split(' ')[0];
  };

  return (
    <View style={styles.DrawerContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: theme.colors.accentColor}}>
        <View
          /* source={require('../assets/images/menu-bg.png')} */
          style={styles.UserContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('UserProfilePhoto');
            }}>
            <Image
              source={
                authData?.user
                  ? authData?.user?.picture === ''
                    ? require('../assets/images/default-profilepic.png')
                    : {uri: authData?.user?.picture}
                  : require('../assets/images/default-profilepic.png')
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
          </TouchableOpacity>
          <View style={styles.UserInfo}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.UserName}>
                {authData?.user
                  ? getFirstFromName(authData?.user?.nombres)
                  : ''}
              </Text>
              <Text style={styles.UserNameRight}>
                {authData?.user
                  ? getFirstFromName(authData?.user?.apellidos)
                  : ''}
              </Text>
            </View>
            <Text style={styles.UserPhone}>{authData?.user?.telefono}</Text>
          </View>
        </View>
        <View style={styles.MenuContainer}>
          <DrawerItemList {...props} />
          {/* <View style={styles.menuButtons}>
            <MenuButton
              title={'Home'}
              onPress={() => {
                console.log('hola');
              }}
            />
          </View> */}
        </View>
      </DrawerContentScrollView>
      <View style={styles.FooterMenuBar}>
        <Text style={styles.FooterText}>A Tu Disposición</Text>
        <TouchableOpacity
          style={styles.LogOutButton}
          onPress={() => {
            auth.signOut();
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.colors.primaryColor,
            }}>
            Cerrar Sesion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DrawerContainer: {
    flex: 1,
  },
  UserContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: -4,
  },
  UserInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  UserNameRight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  UserPhone: {
    fontSize: 16,
    color: '#fff',
  },
  MenuContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  FooterMenuBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  LogOutButton: {
    backgroundColor: theme.colors.accentColor,
    width: '100%',
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    marginBottom: -10,
  },
  FooterText: {
    color: 'black',
    fontSize: 14,
    marginBottom: 10,
  },
  menuButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FooterIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
