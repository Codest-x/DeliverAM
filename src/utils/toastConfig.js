import React from 'react';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {theme} from '../constants/theme';

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: theme.colors.accentColor}}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
