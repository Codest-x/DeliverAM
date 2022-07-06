import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {useAuth} from '../contexts/auth';
import ClientStack from './ClientStack';
import DomiciliaryStack from './DomiciliaryStack';

export default function AppStack() {
  const {authData} = useAuth();

  const Drawer = createDrawerNavigator();

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
      {authData?.user?.roles[0]?.name === 'Cliente'
        ? ClientStack(Drawer)
        : DomiciliaryStack(Drawer)}
    </Drawer.Navigator>
  );
}
