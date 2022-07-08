import React from 'react';
import {HomeC, ViewOrders, AddOrder} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ClientStack(Drawer) {
  return (
    <>
      <Drawer.Screen
        name="Inicio"
        component={HomeC}
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
        name="Ver Ordenes"
        component={ViewOrders}
        options={{
          headerShown: false,
          /* drawerItemStyle: {
                height: 0,
              }, */
          drawerIcon: ({color}) => (
            <Icon name={'reader-outline'} size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agregar Orden"
        component={AddOrder}
        options={{
          headerShown: false,
          /* drawerItemStyle: {
                height: 0,
              }, */
          drawerIcon: ({color}) => (
            <Icon name={'add'} size={24} color={color} />
          ),
        }}
      />
    </>
  );
}
