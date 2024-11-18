
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../src/components/CustomButton';

function TelaLogin() {
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, { style: styles.label }, 'Nome'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Digite seu nome',
    }),
    React.createElement(Text, { style: styles.label }, 'Senha'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Digite sua senha',
      secureTextEntry: true,
    }),
    React.createElement(Text, { style: styles.forgotPassword }, 'Recuperar senha'),
    React.createElement(CustomButton, {
      title: 'Entrar',
      onPress: () => {},
    })
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#005BB5',
    textAlign: 'right',
    marginBottom: 20,
  },
});

export default TelaLogin;