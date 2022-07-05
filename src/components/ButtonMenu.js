import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export default function ButtonMenu({
  children,
  onPress,
  title,
  iconName,
  iconColor,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonMenuContainer}>
      {iconName && (
        <Icon
          name={iconName}
          size={24}
          color={iconColor ? iconColor : 'black'}
        />
      )}

      <Text style={styles.ButtonMenuText}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonMenuContainer: {
    backgroundColor: '#ececec',
    borderRadius: 5,
    minHeight: 45,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ButtonMenuText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
