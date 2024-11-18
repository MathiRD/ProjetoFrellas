import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../src/components/CustomButton';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';
import * as Font from 'expo-font';

function TelaAbertura() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Ou um indicador de carregamento
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backgroundFrellas.png')} style={styles.imagemFundo}>
        <View style={styles.overlay}>
          <Image source={require('../assets/iconFrellas.png')} style={styles.logo} />
          <Text style={styles.title}>FRELLAS</Text>
          <CustomButton title="Log In" onPress={() => navigation.navigate('Login')} />
          <CustomButton title="Registrar" onPress={() => navigation.navigate('Register')} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagemFundo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 80,
    fontFamily: 'Abel_400Regular',
    color: '#808080',
    marginBottom: 200,
  },
});

export default TelaAbertura;