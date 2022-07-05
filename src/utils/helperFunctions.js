import Toast from 'react-native-toast-message';

const showError = (title, message) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

const showSuccess = (title, message) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

export {showError, showSuccess};
