
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../src/components/CustomButton';

function TelaRegisto() {
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, { style: styles.label }, 'Nome'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Digite seu nome',
    }),
    React.createElement(Text, { style: styles.label }, 'Email'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Digite seu email',
    }),
    React.createElement(Text, { style: styles.label }, 'Senha'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Digite sua senha',
      secureTextEntry: true,
    }),
    React.createElement(Text, { style: styles.label }, 'Confirme sua senha'),
    React.createElement(TextInput, {
      style: styles.input,
      placeholder: 'Confirme sua senha',
      secureTextEntry: true,
    }),
    React.createElement(CustomButton, {
      title: 'Registrar',
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
});

export default TelaRegisto;