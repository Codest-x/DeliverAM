import React from 'react';
import {HomeD, OrderPage} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DomiciliaryStack(Drawer) {
  return (
    <>
      <Drawer.Screen
        name="Inicio"
        component={HomeD}
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
      <Drawer.Screen
        name="Orden"
        component={OrderPage}
        options={{
          headerShown: false,
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </>
  );
}
