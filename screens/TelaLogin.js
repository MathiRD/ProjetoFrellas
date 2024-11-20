import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../src/components/CustomButton';

function TelaLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <Text style={styles.forgotPassword}>Recuperar senha</Text>
      <CustomButton
        title="Entrar"
        onPress={() => navigation.navigate('Home')} 
      />
    </View>
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