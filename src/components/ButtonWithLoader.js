import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {theme} from '../constants/theme';

// create a component
export default function ButtonWithLoader({
  isLoading,
  text,
  onPress,
  style,
  textColor,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.BtnStyle, style]}>
      {!!isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text
          style={[
            styles.TextStyle,
            {
              color: textColor ? textColor : theme.colors.primaryColor,
            },
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// define your styles
const styles = StyleSheet.create({
  BtnStyle: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.accentColor,
  },
  TextStyle: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
