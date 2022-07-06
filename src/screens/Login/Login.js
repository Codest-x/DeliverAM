import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import {theme} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../contexts/auth';

export default function Login({navigation}) {
  const auth = useAuth();

  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    isSecure: true,
  });

  const {isLoading, email, password, isSecure} = state;
  const updateState = data => setState(() => ({...state, ...data}));

  const onLogin = async () => {
    updateState({isLoading: true});
    await auth.signIn(email, password);
    updateState({isLoading: false});
  };

  return (
    <ImageBackground
      style={styles.LoginContainer}
      source={require('../../assets/images/bg-map.png')}
      resizeMode="cover"
      imageStyle={{opacity: 0.5}}>
      <StatusBar backgroundColor={theme.colors.primaryColor} />
      <View style={styles.UserLoginInfo}>
        <Image
          style={{width: 250, height: 250}}
          source={require('../../assets/images/deliverygif.gif')}
        />
        <View style={styles.LoginTitle}>
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
              fontSize: 40,
              fontWeight: 'bold',
              marginLeft: 10,
              color: theme.colors.accentColor,
            }}>
            DeliverAM
          </Text>
        </View>
        <TextInput
          value={email}
          placeholder="Ingrese su correo electrónico"
          onChangeText={email => updateState({email})}
          style={styles.InputStyle}
          placeholderTextColor="gray"
          textContentType="emailAddress"
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
        <ButtonWithLoader
          text="Iniciar Sesion"
          onPress={onLogin}
          isLoading={isLoading}
        />
        <TouchableOpacity
          style={{padding: 10, width: '100%'}}
          onPress={() => console.log('Recuperar Contraseña')}>
          <Text
            style={{
              color: theme.colors.accentColor,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            Olvide mi contraseña ?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.SignUpButton}
        onPress={() => navigation.navigate('SignUpType')}>
        <Text style={styles.SignUpText}>¿No tienes una cuenta?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  UserLoginInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  LoginTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  SignUpButton: {
    height: 40,
    width: '90%',
    backgroundColor: theme.colors.accentColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  SignUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
