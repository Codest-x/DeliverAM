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
    showError(
      'Contraseña Debil',
      'Porfavore ingrese una contraseña de al menos 8 caracteres',
    );
  } else {
    return '';
  }
};

export default function (data) {
  const {email, password} = data;

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, 'email');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        showError(
          'Correo Electrónico Invalido',
          'Porfavor ingrese un correo electrónico valido',
        );
      }
    }
  }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, 'password');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLengthPwd(password, 8);
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }
}
