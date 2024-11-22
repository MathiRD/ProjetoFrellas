import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../src/components/CustomButton';
import Supabase from '../src/SupabaseClient';
import Modal from 'react-native-modal';

function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [emailReset, setEmailReset] = useState('');

  const handleLogin = async () => {
    const { error } = await Supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
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

    const { error } = await Supabase.auth.resetPasswordForEmail(emailReset);
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Um link de redefinição foi enviado ao seu email.');
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Senha</Text>
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
    borderColor: '#000',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
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
});

export default TelaLogin;