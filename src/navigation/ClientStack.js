import React from 'react';
import {HomeC} from '../screens';
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
            <Icon name={'home'} size={24} color={color} />
          ),
        }}
      />
    </>
  );
}
