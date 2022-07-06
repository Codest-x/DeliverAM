import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';
import {StatusBar} from 'react-native';

export default function LoadingScreen() {
  const title = ['Deliver', 'AM.'];

  return (
    <ImageBackground
      style={styles.loadingContainer}
      source={require('../assets/images/bg-map.png')}>
      <Image
        style={styles.loadingLogo}
        source={require('../assets/images/deliverygif.gif')}
      />
      <View style={styles.textContainer}>
        {title.map((item, index) => (
          <Text
            key={`loadtitext-${index}`}
            style={{
              fontSize: 60,
              color:
                index === 0
                  ? theme.colors.primaryTextColor
                  : theme.colors.accentColor,
              fontWeight: 'bold',
            }}>
            {item}
          </Text>
        ))}
      </View>
      <ActivityIndicator size="large" color={theme.colors.accentColor} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accentColor,
  },
  loadingLogo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: -100,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
