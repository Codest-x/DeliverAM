import validator from 'is_js';
import Toast from 'react-native-toast-message';

const showError = (error, message) => {
  Toast.show({
    type: 'error',
    text1: error,
    text2: message,
  });
};

const showSuccess = (error, message) => {
  Toast.show({
    type: 'success',
    text1: 'Correcto',
    text2: message,
  });
};

const checkEmpty = (val, type) => {
  if (validator.empty(val.trim())) {
    type === 'email'
      ? showError(
          'Correo Electrónico Vacio',
          'Porfavor ingrese un correo electrónico',
        )
      : showError('Contraseña Vacia', 'Porfavor ingrese una contraseña');
  } else {
    return '';
  }
};

const checkMinLengthPwd = (val, minLength) => {
  if (val.trim().length < minLength) {
    throw new Error('Contraseña Muy Corta');
  } else {
    return true;
  }
};

function ValidateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    throw new Error('Correo Electrónico Invalido');
  }
}

export default function (data) {
  try {
    const {email, password} = data;

    const isValidEmail = ValidateEmail(email);
    const isValidPassword = checkMinLengthPwd(password, 8);

    if (isValidEmail && isValidPassword) return true;

    return false;
  } catch (error) {
    showError(error.name, error.message);
    return false;
  }
}
