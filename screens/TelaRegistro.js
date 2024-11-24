import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator, ImageBackground, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';
import CustomButton from '../src/components/CustomButton';
import Supabase from '../src/SupabaseClient';

function TelaRegistro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroCampos, setErroCampos] = useState({});
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = async () => {
    setErroCampos({});
    setLoading(true);

    if (!nome || !email || !senha || !confirmaSenha) {
      setErroCampos((prev) => ({
        ...prev,
        ...(nome ? {} : { nome: 'Este campo é obrigatório' }),
        ...(email ? {} : { email: 'Este campo é obrigatório' }),
        ...(senha ? {} : { senha: 'Este campo é obrigatório' }),
        ...(confirmaSenha ? {} : { confirmaSenha: 'Este campo é obrigatório' }),
      }));
      setLoading(false);
      return;
    }

    if (senha !== confirmaSenha) {
      setErroCampos((prev) => ({
        ...prev,
        senha: 'As senhas não coincidem',
        confirmaSenha: 'As senhas não coincidem',
      }));
      setLoading(false);
      return;
    }

    const username = email.split('@')[0];

    const { user, error } = await Supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          username: username,
          full_name: nome,
        },
      },
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    }

    setLoading(false);
  };

  return (
    <ImageBackground source={require('../assets/backgroundFrellas.png')} style={styles.imagemFundo}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.innerContainer}>
          <Image source={require('../assets/iconFrellas.png')} style={styles.logo} />
          <Text style={styles.title}>FRELLAS</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={[styles.input, erroCampos.nome && { borderColor: '#FF0000' }]}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={setNome}
          />
          {erroCampos.nome && <Text style={styles.errorText}>{erroCampos.nome}</Text>}

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={[styles.input, erroCampos.email && { borderColor: '#FF0000' }]}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
          {erroCampos.email && <Text style={styles.errorText}>{erroCampos.email}</Text>}

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={[styles.input, erroCampos.senha && { borderColor: '#FF0000' }]}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          {erroCampos.senha && <Text style={styles.errorText}>{erroCampos.senha}</Text>}

          <Text style={styles.label}>Confirme a senha:</Text>
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

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  imagemFundo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 200,
    marginBottom: 20, 
  },
  title: {
    fontSize: 80,
    fontFamily: 'Abel_400Regular',
    color: '#808080',
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left', // Alinhamento para garantir que a label "Confirme a senha" fique no mesmo alinhamento
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000', // Alterado para preto
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaRegistro;