import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useAuth} from '../contexts/auth';

export default function Home({navigation}) {
  const {authData} = useAuth();
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView contentContainerStyle={styles.HomeScroll}>
        <Text style={{color: 'black'}}>
          Bienvenido {authData?.user?.nombres} {authData?.user?.apellidos}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  HomeScroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
