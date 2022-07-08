import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonMenu from './ButtonMenu';
import FadeInView from './FadeInView';

export default function DropDownMenu({
  title,
  iconName,
  iconColor,
  onPress,
  options,
}) {
  const [active, setActive] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress, setActive(!active);
        }}
        style={styles.ButtonMenuContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {iconName && (
            <Icon
              name={iconName}
              size={24}
              color={iconColor ? iconColor : 'black'}
            />
          )}

          <Text style={styles.ButtonMenuText}>{title}</Text>
        </View>
        <Icon
          name={active ? 'arrow-up' : 'arrow-down'}
          size={24}
          color={iconColor ? iconColor : 'black'}
        />
      </TouchableOpacity>
      {active && (
        <FadeInView style={styles.FadeInView}>
          {options.map(option => (
            <ButtonMenu
              title={option.title}
              iconName={option.iconName}
              onPress={() => {
                console.log('hola');
              }}
            />
          ))}
        </FadeInView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ButtonMenuContainer: {
    backgroundColor: '#ececec',
    borderRadius: 5,
    minHeight: 45,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ButtonMenuText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  FadeInView: {
    width: '93%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
