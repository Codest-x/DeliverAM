import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {useAuth} from '../contexts/auth';
import ClientStack from './ClientStack';
import DomiciliaryStack from './DomiciliaryStack';
import {theme} from '../constants/theme';

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
        drawerActiveBackgroundColor: theme.colors.accentColor,
        drawerActiveTintColor: theme.colors.primaryColor,
        drawerInactiveBackgroundColor: theme.colors.secondaryColor,
        drawerInactiveTintColor: '#000',
        swipeMinDistance: 50,
        swipeEdgeWidth: 50,
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
