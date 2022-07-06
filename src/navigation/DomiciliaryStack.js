import React from 'react';
import {HomeD} from '../screens';
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
    </>
  );
}
