import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {Home} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      backBehavior={'initialRoute'}
      initialRouteName="Inicio"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#ececec',
        drawerActiveTintColor: '#000',
        drawerInactiveBackgroundColor: '#fff',
        drawerInactiveTintColor: '#000',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: -25,
        },
      }}>
      <Drawer.Screen
        name="Inicio"
        component={Home}
        options={{
          headerShown: false,
          /* drawerItemStyle: {
            height: 0,
          }, */
          drawerIcon: ({color}) => (
            <Icon name={'home-outline'} size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
