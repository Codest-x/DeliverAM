import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView contentContainerStyle={styles.HomeScroll}>
        <Text style={{color: 'black'}}>Hola Como Estas</Text>
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
