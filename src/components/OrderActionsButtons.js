import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../constants/theme';

export default function OrderActionsButtons({
  leftText,
  rightText,
  onPressLeft,
  onPressRight,
}) {
  return (
    <View style={styles.ActionButtonsContainer}>
      <TouchableOpacity
        onPress={onPressLeft}
        style={[
          styles.ButtonAction,
          {
            backgroundColor: theme.colors.accentColor,
          },
        ]}>
        <Text style={styles.TextAction}>{leftText || 'Editar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRight}
        style={[
          styles.ButtonAction,
          {
            backgroundColor: 'red',
          },
        ]}>
        <Text style={styles.TextAction}>{rightText || 'Eliminar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ActionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ButtonAction: {
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextAction: {
    color: '#fff',
    fontSize: 16,
  },
});
