import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../utils/toastConfig';
import {useAuth} from '../contexts/auth';
import {LoadingScreen, OfflineScreen} from '../screens';
import NetInfo from '@react-native-community/netinfo';

export default function Routes() {
  const Stack = createStackNavigator();
  const {authData, loading} = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  NetInfo.fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
        translucent={true}
      />
      <Stack.Navigator>
        {isConnected ? (
          loading ? (
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{headerShown: false}}
            />
          ) : authData && authData?.token ? (
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{headerShown: false}}
            />
          )
        ) : (
          <Stack.Screen
            name="OfflineScreen"
            component={OfflineScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
