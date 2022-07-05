import React from 'react';
import {View, Text} from 'react-native';
import {theme} from '../../constants/theme';

const SignUpText = ({title1, title2, type, ...props}) => (
  <View {...props}>
    <Text
      style={{
        color: 'black',
        fontSize: type === 'title' ? 30 : 20,
        fontWeight: 'bold',
      }}>
      {title1}
    </Text>
    <Text
      style={{
        color: 'black',
        fontSize: type === 'title' ? 40 : 30,
        fontWeight: 'bold',
        marginLeft: 10,
        color: theme.colors.accentColor,
      }}>
      {title2}
    </Text>
  </View>
);

export {SignUpText};
