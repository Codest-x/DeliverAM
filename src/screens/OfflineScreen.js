import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

export default function OfflineScreen() {
  return (
    <View style={styles.OfflineContainer}>
      <Image
        source={require('../assets/images/offline-img.gif')}
        style={{width: 250, height: 250}}
      />
      <Text style={styles.OfflineText}>
        Ohh, Parece que no tienes conexion a internet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  OfflineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryColor,
  },
  OfflineText: {
    color: theme.colors.primaryTextColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
