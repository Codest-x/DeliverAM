import {StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import SignUpAsClient from './SignUpAsClient';
import SignUpAsDomiciliary from './SignUpAsDomiciliary';

export default function SignUp({route, navigation}) {
  const {usertype} = route.params;

  return (
    <ImageBackground
      style={styles.SignUpContainer}
      source={require('../../assets/images/bg-map.png')}
      resizeMode="cover"
      imageStyle={{opacity: 0.5}}>
      {usertype === 'Cliente' ? <SignUpAsClient /> : <SignUpAsDomiciliary />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SignUpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});
