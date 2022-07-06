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

const getTimeDifference = date => {
  const newDate = new Date(date).toUTCString();
  const nowDate = new Date(Date.now()).toUTCString();

  const seconds =
    (new Date(nowDate).getTime() - new Date(newDate).getTime()) / 1000;

  if (seconds <= 60) {
    return `Hace ${seconds} segundos`;
  }

  if (seconds > 60 && seconds < 3600) {
    return `Hace ${Math.floor(seconds / 60)} Minutos`;
  }

  if (seconds > 3600) {
    return `Hace ${Math.floor(seconds / 3600)} ${
      Math.floor(seconds / 3600) === 1 ? 'Hora' : 'Horas'
    }`;
  }
};

export {showError, showSuccess, getTimeDifference};
