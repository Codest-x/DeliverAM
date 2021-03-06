import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInService,
  registerClientService,
  registerDomiciliaryService,
  getUserByToken,
  getUserFMCToken,
  getDomiciliaryFMCToken,
  updateClientFMCToken,
  updateDomiciliaryFMCToken,
} from '../services/authService';
import {showError, showSuccess} from '../utils/helperFunctions';
import messaging, {firebase} from '@react-native-firebase/messaging';
//Create the Auth Context to be used by the App

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.

    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);

        const userType = _authData?.user?.roles[0]?.name;

        const token = await messaging().getToken();

        if (userType === 'Cliente') {
          getUserFMCToken(_authData.token, _authData.user._id).then(res => {
            if (token !== res.data.fmcToken) {
              updateClientFMCToken(
                _authData.token,
                _authData.user._id,
                token,
              ).then(res => {
                if (token !== res.data.fmcToken) {
                  updateClientFMCToken(
                    _authData.token,
                    _authData.user._id,
                    token,
                  );
                }
              });
            }

            return;
          });
        } else {
          getDomiciliaryFMCToken(_authData.token, _authData.user._id).then(
            res => {
              if (token !== res.data.fmcToken) {
                updateDomiciliaryFMCToken(
                  _authData.token,
                  _authData.user._id,
                  token,
                );
              }

              return;
            },
          );
        }
      }
    } catch (error) {
      //If there are any errors, it's logged and the state is updated.
      console.log(error);
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (email, password) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.

    let errors = false;

    await signInService(email, password)
      .then(async ({data}) => {
        const user = await getUserByToken(data.token);
        setAuthData({
          token: data.token,
          user: user.data,
        });
        AsyncStorage.setItem(
          '@AuthData',
          JSON.stringify({
            token: data.token,
            user: user.data,
          }),
        );
      })
      .catch(err => {
        err ? (errors = err.response.data.error) : false;
        showError('Error', err.response.data.error);
      });

    return errors;

    //setAuthData(_authData);

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    //AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signUpAsClient = async data => {
    let errors = false;

    const tokenFMC = await messaging().getToken();

    await registerClientService({
      ...data,
      fmcToken: tokenFMC,
    })
      .then(async ({data}) => {
        showSuccess(
          'Disfruta como cliente',
          'Usuario registrado correctamente',
        );
        await messaging().registerDeviceForRemoteMessages();
        //signIn(data.email, data.password);
      })
      .catch(err => {
        err ? (errors = err.response.data.message) : false;
        showError('Error', err.response.data.message);
      });

    return errors;
  };

  const signUpAsDomiciliary = async data => {
    let errors = false;

    const tokenFMC = await messaging().getToken();

    await registerDomiciliaryService({
      ...data,
      fmcToken: tokenFMC,
    })
      .then(async ({data}) => {
        showSuccess(
          'Disfruta como domiciliario',
          'Usuario registrado correctamente',
        );
        await messaging().registerDeviceForRemoteMessages();
        //signIn(data.email, data.password);
      })
      .catch(err => {
        err ? (errors = err.response.data.message) : false;
        showError('Error', err.response.data.message);
      });

    return errors;
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack

    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.

    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context

    <AuthContext.Provider
      value={{
        authData,
        loading,
        signUpAsClient,
        signUpAsDomiciliary,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
