import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';

const TelaChatVendedor = () => {
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá, tudo bem?', enviadoPorUsuario: true },
    { id: '2', texto: 'Tudo e com você?', enviadoPorUsuario: false },
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (novaMensagem.trim() === '') return;
    setMensagens((prevMensagens) => [
      ...prevMensagens,
      { id: Date.now().toString(), texto: novaMensagem, enviadoPorUsuario: true },
    ]);
    setNovaMensagem('');
  };

  const renderMensagem = ({ item }) => (
    <View
      style={[
        styles.bolhaMensagem,
        item.enviadoPorUsuario ? styles.mensagemUsuario : styles.mensagemProfissional,
      ]}
    >
      <Text style={styles.textoMensagem}>{item.texto}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.voltar}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.nomeProfissional}>João da Silva</Text>
      </View>

      {}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={renderMensagem}
        contentContainerStyle={styles.listaMensagens}
      />

      {}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem aqui"
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoEnviarTexto}>&#9658;</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20, 
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16, 
  },
  voltar: {
    fontSize: 18,
    color: '#333',
    marginRight: 8,
  },
  nomeProfissional: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listaMensagens: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bolhaMensagem: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '75%',
  },
  mensagemUsuario: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  mensagemProfissional: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  textoMensagem: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20, 
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  botaoEnviar: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEnviarTexto: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center', 
    textAlignVertical: 'center', 
    marginTop: -5,
  },
});

export default TelaChatVendedor;
