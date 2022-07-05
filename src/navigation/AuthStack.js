import React, {useEffect} from 'react';
import {Login, SignUp, OnboardingScreen, SignUpType} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function AuthStack() {
  const [isOldUser, setIsOldUser] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarding').then(data => {
      data === 'true' ? setIsOldUser(true) : setIsOldUser(false);
    });
  }, []);

  return (
    <Stack.Navigator>
      {!isOldUser && (
        <Stack.Screen
          name="OnBoarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpType"
        component={SignUpType}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
