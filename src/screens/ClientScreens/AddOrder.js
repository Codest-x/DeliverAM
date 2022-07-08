import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants/theme';
import {Dimensions} from 'react-native';
import {useAuth} from '../../contexts/auth';
import {addOrder} from '../../services/ordersService';
import {showError, showSuccess} from '../../utils/helperFunctions';

const {width, height} = Dimensions.get('window');

export default function AddOrder() {
  const [order, setOrder] = useState({
    petition: '',
    clientofert: '',
  });

  const {authData} = useAuth();

  const {petition, clientofert} = order;

  const updateState = data => setOrder(() => ({...order, ...data}));

  const createOrder = () => {
    if (petition.length < 0 && clientofert.length < 0) return;
    addOrder(
      {
        ...order,
        client: authData?.user?._id,
      },
      authData?.token,
    )
      .then(response => {
        showSuccess('Pedido creado correctamente');
        setOrder({
          petition: '',
          clientofert: '',
        });
      })
      .catch(error => {
        showError('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.AddOrderContainer}>
      <View style={styles.AddOrderContent}>
        <View style={styles.AddOrderForm}>
          <Text style={styles.PetitionTitle}>Ingrese su petición</Text>
          <TextInput
            value={petition}
            placeholder="Ingrese la petición"
            onChangeText={petition => updateState({petition})}
            style={styles.PetitionContainer}
            placeholderTextColor="gray"
          />
          <Text style={styles.PetitionTitle}>Ingrese cuanto desea ofertar</Text>
          <TextInput
            value={clientofert}
            placeholder="Ingrese cuanto desea ofertar"
            onChangeText={clientofert => updateState({clientofert})}
            style={styles.InputStyle}
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.AddOrderButton} onPress={createOrder}>
          <Text style={styles.AddOrderButtonText}>Agregar Orden</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AddOrderContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primaryColor,
  },
  AddOrderContent: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
  AddOrderForm: {
    width: width,
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  InputStyle: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  PetitionTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  PetitionContainer: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlignVertical: 'top',
    color: 'black',
  },
  AddOrderButton: {
    width: '90%',
    height: 50,
    backgroundColor: theme.colors.accentColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
  },
  AddOrderButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
