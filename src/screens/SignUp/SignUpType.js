import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import {theme} from '../../constants/theme';

const {width, height} = Dimensions.get('window');

const UserCardInfo = ({
  usertype,
  description,
  onPress,
  onPressViewMore,
  numberOfLines,
}) => {
  return (
    <TouchableOpacity style={styles.UserCard} onPress={onPress}>
      <Image
        style={styles.UserImage}
        source={
          usertype === 'Cliente'
            ? require('../../assets/images/client-user.png')
            : require('../../assets/images/delivery-user.png')
        }
      />
      <View style={styles.UserInfo}>
        <Text style={styles.UserType}>{usertype}</Text>
        <Text numberOfLines={numberOfLines} style={styles.UserDescription}>
          {description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressViewMore}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Text
          style={{
            color: theme.colors.secondaryTextColor,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            fontWeight: 'bold',
          }}>
          Ver Mas
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const SignUpType = ({navigation}) => {
  const [showAllClient, setShowAllClient] = React.useState(false);
  const [showAllDelivery, setShowAllDelivery] = React.useState(false);

  return (
    <ImageBackground
      style={styles.UserTypeContainer}
      source={require('../../assets/images/bg-map.png')}
      resizeMode="cover"
      imageStyle={{opacity: 0.5}}>
      <StatusBar translucent={false} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            color: theme.colors.accentColor,
            fontSize: 30,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            paddingVertical: 20,
          }}>
          Elige tu tipo de usuario
        </Text>
        <UserCardInfo
          usertype="Cliente"
          onPress={() => navigation.navigate('SignUp', {usertype: 'Cliente'})}
          onPressViewMore={() => setShowAllClient(!showAllClient)}
          numberOfLines={showAllClient ? 0 : 4}
          description="Como cliente tendras las posibilidades de pedir domicilios, mirar el domiciliario mas cercano, ofrecer una cantidad de dinero en base a lo que necesites"
        />
        <UserCardInfo
          usertype="Domiciliario"
          onPress={() =>
            navigation.navigate('SignUp', {usertype: 'Domiciliario'})
          }
          onPressViewMore={() => setShowAllDelivery(!showAllDelivery)}
          numberOfLines={showAllDelivery ? 0 : 4}
          description="Como vendedor podras aceptar domicilios, ofertar una cantidad diferente a la del cliente en cada domicilio, los clientes podran saber tu ubicación para rastrear su pedido"
        />
        <Text
          style={{
            color: theme.colors.primaryTextColor,
            width: '90%',
            textAlign: 'center',
            textDecorationColor: theme.colors.accentColor,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
          }}>
          Al crear una cuenta estas aceptando nuestros terminos de usuario y
          nuestras politicas de privacidad
        </Text>
      </View>
      <TouchableOpacity
        style={styles.AlreadyHaveAccount}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: theme.colors.secondaryTextColor,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Ya tengo una cuenta
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  UserTypeContainer: {
    flex: 1,
    backgroundColor: theme.colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  UserCard: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: theme.colors.accentColor,
    borderRadius: 10,
  },
  UserImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  UserInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  UserType: {
    fontSize: 30,
    color: theme.colors.secondaryTextColor,
    fontWeight: 'bold',
  },
  UserDescription: {
    fontSize: 16,
    color: theme.colors.secondaryTextColor,
  },
  AlreadyHaveAccount: {
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
});

export default SignUpType;
