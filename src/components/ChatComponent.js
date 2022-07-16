import {View, Dimensions} from 'react-native';
import React from 'react';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {theme} from '../constants/theme';

const {width} = Dimensions.get('window');

export default function ChatComponent({messages, onSend, userId}) {
  return (
    <View
      style={{
        width: width,
        height: '100%',
        paddingBottom: 40,
      }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userId,
        }}
        infiniteScroll
        showAvatarForEveryMessage={true}
        placeholder="Escribe un mensaje..."
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: theme.colors.secondaryTextColor,
                },
                left: {
                  color: '#24204F',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.accentColor,
                  borderWidth: 1,
                },
                right: {
                  backgroundColor: theme.colors.accentColor,
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: theme.colors.primaryColor,
              }}
              textInputStyle={{
                color: theme.colors.primaryTextColor,
              }}
            />
          );
        }}
        renderSend={props => {
          return (
            <Send
              {...props}
              textStyle={{color: theme.colors.accentColor}}
              label={'Enviar'}
            />
          );
        }}
      />
    </View>
  );
}
