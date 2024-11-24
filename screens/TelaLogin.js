import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../src/components/CustomButton';
import Supabase from '../src/SupabaseClient';
import Modal from 'react-native-modal';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';

function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [emailReset, setEmailReset] = useState('');
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await Supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      )
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePasswordReset = async () => {
    if (!emailReset) {
      Alert.alert('Erro', 'O email não pode estar vazio.');
      return;
    }

    setModalVisible(false);
    setLoading(true);

    const { error } = await Supabase.auth.resetPasswordForEmail(emailReset);
    setLoading(false);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Um link de redefinição foi enviado ao seu email.');
    }
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

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <Text style={styles.forgotPassword} onPress={toggleModal}>
            Recuperar senha
          </Text>
          <CustomButton title="Entrar" onPress={handleLogin} />

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}

          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Recuperar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                value={emailReset}
                onChangeText={setEmailReset}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButton} onPress={handlePasswordReset}>
                  <Text style={styles.modalButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={toggleModal}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    textAlign: 'left',  // Alinhando à esquerda
    width: '100%',      // Garantir que a largura ocupe a tela
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
  },
  forgotPassword: {
    color: '#005BB5',
    textAlign: 'right',
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#008BB5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#001BB5',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
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

export default TelaLogin;
