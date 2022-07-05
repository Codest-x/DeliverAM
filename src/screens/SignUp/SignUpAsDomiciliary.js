import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import {theme} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../contexts/auth';

export default function SignUpAsDomiciliary() {
  const auth = useAuth();
  const [state, setState] = useState({
    isLoading: false,
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    isSecurePwd: true,
    isSecureConfirmPwd: true,
  });
  const {
    isLoading,
    nombres,
    apellidos,
    telefono,
    email,
    password,
    confirmPassword,
    isSecure,
    isSecureConfirmPwd,
  } = state;
  const updateState = data => setState(() => ({...state, ...data}));

  const onSignup = async () => {
    updateState({isLoading: true});
    await auth.signUpAsDomiciliary({
      nombres,
      apellidos,
      telefono,
      email,
      password,
    });
    updateState({isLoading: false});
  };

  return (
    <View style={styles.UserSignUpInfo}>
      <View style={styles.SignUpTitle}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Bienvenido a
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginLeft: 10,
            color: theme.colors.accentColor,
          }}>
          DeliverAM
        </Text>
      </View>
      <View style={styles.SignUpSubTitle}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Estas Registrandote como
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 10,
            color: theme.colors.accentColor,
          }}>
          Domiciliario
        </Text>
      </View>
      <TextInput
        value={nombres}
        onChangeText={nombres => updateState({nombres})}
        placeholder="Ingrese sus nombres"
        style={styles.InputStyle}
        placeholderTextColor="gray"
      />
      <TextInput
        value={apellidos}
        onChangeText={apellidos => updateState({apellidos})}
        placeholder="Ingrese sus apellidos"
        textContentType="password"
        style={styles.InputStyle}
        placeholderTextColor="gray"
      />
      <TextInput
        value={telefono}
        onChangeText={telefono => updateState({telefono})}
        placeholder="Ingrese su telefono"
        textContentType="telephoneNumber"
        keyboardType="numeric"
        style={styles.InputStyle}
        placeholderTextColor="gray"
      />
      <TextInput
        value={email}
        onChangeText={email => updateState({email})}
        placeholder="Ingrese su email"
        style={styles.InputStyle}
        placeholderTextColor="gray"
      />
      <View style={{width: '100%'}}>
        <TextInput
          value={password}
          placeholder="Ingrese su contraseña"
          onChangeText={password => updateState({password})}
          style={styles.InputStyle}
          placeholderTextColor="gray"
          secureTextEntry={isSecure}
          textContentType="password"
        />
        <Icon
          name={isSecure ? 'ios-eye' : 'ios-eye-off'}
          size={25}
          color="gray"
          style={{
            position: 'absolute',
            right: 10,
            top: 12,
          }}
          onPress={() => updateState({isSecure: !isSecure})}
        />
      </View>
      <View style={{width: '100%'}}>
        <TextInput
          value={confirmPassword}
          placeholder="Ingrese nuevamente su contraseña"
          onChangeText={confirmPassword => updateState({confirmPassword})}
          style={styles.InputStyle}
          placeholderTextColor="gray"
          secureTextEntry={isSecureConfirmPwd}
          textContentType="password"
        />
        <Icon
          name={isSecureConfirmPwd ? 'ios-eye' : 'ios-eye-off'}
          size={25}
          color="gray"
          style={{
            position: 'absolute',
            right: 10,
            top: 12,
          }}
          onPress={() => updateState({isSecureConfirmPwd: !isSecureConfirmPwd})}
        />
      </View>
      <ButtonWithLoader
        text="Registrarme"
        onPress={onSignup}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  UserSignUpInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  SignUpTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  SignUpSubTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  InputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    color: theme.colors.primaryTextColor,
    backgroundColor: theme.colors.primaryColor,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 18,
  },
});
