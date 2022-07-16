import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

//Create the Auth Context to be used by the App

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [themeData, setTheme] = useState();

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    getColorScheme();
  }, []);

  const getColorScheme = () => {
    setTheme(Appearance.getColorScheme());
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <ThemeContext.Provider
      value={{
        themeData,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}

export {useTheme, ThemeContext, ThemeProvider};
