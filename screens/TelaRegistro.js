import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import CustomButton from '../src/components/CustomButton';
import Supabase from '../src/SupabaseClient';

function TelaRegistro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroCampos, setErroCampos] = useState({});

  const handleRegister = async () => {
    setErroCampos({});

    if (!nome || !email || !senha || !confirmaSenha) {
      setErroCampos((prev) => ({
        ...prev,
        ...(nome ? {} : { nome: 'Este campo é obrigatório' }),
        ...(email ? {} : { email: 'Este campo é obrigatório' }),
        ...(senha ? {} : { senha: 'Este campo é obrigatório' }),
        ...(confirmaSenha ? {} : { confirmaSenha: 'Este campo é obrigatório' }),
      }));
      return;
    }

    if (senha !== confirmaSenha) {
      setErroCampos((prev) => ({
        ...prev,
        senha: 'As senhas não coincidem',
        confirmaSenha: 'As senhas não coincidem',
      }));
      return;
    }

    const { user, error } = await Supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[styles.input, erroCampos.nome && { borderColor: '#FF0000' }]}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      {erroCampos.nome && <Text style={styles.errorText}>{erroCampos.nome}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, erroCampos.email && { borderColor: '#FF0000' }]}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      {erroCampos.email && <Text style={styles.errorText}>{erroCampos.email}</Text>}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={[styles.input, erroCampos.senha && { borderColor: '#FF0000' }]}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {erroCampos.senha && <Text style={styles.errorText}>{erroCampos.senha}</Text>}

      <Text style={styles.label}>Confirme a senha</Text>
      <TextInput
        style={[styles.input, erroCampos.confirmaSenha && { borderColor: '#FF0000' }]}
        placeholder="Confirme sua senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />
      {erroCampos.confirmaSenha && (
        <Text style={styles.errorText}>{erroCampos.confirmaSenha}</Text>
      )}

      <CustomButton title="Registrar" onPress={handleRegister} />
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
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default TelaRegistro;