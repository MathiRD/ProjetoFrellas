import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const TelaChatVendedor = ({ navigation }) => {
  const route = useRoute();
  const { servico } = route.params || {}; // Garante que route.params sempre exista

  const [mensagens, setMensagens] = useState([
    {
      id: "1",
      texto: `Olá, estou interessado em ${
        servico?.categoria || "seu serviço"
      }.`,
      enviadoPorUsuario: true,
    },
    { id: "2", texto: "Ótimo! Como posso ajudar?", enviadoPorUsuario: false },
  ]);

  const [novaMensagem, setNovaMensagem] = useState("");

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "") return;
    setMensagens((prevMensagens) => [
      ...prevMensagens,
      {
        id: Date.now().toString(),
        texto: novaMensagem,
        enviadoPorUsuario: true,
      },
    ]);
    setNovaMensagem("");
  };

  const renderMensagem = ({ item }) => (
    <View
      style={[
        styles.bolhaMensagem,
        item.enviadoPorUsuario
          ? styles.mensagemUsuario
          : styles.mensagemProfissional,
      ]}
    >
      <Text style={styles.textoMensagem}>{item.texto}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("TelaChatGeral")}>
          <Text style={styles.voltar}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.nomeProfissional}>
          {servico?.categoria || "Serviço"}
        </Text>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={renderMensagem}
        contentContainerStyle={styles.listaMensagens}
      />

      {/* Campo de entrada de texto */}
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
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  voltar: {
    fontSize: 30, // Aumente o tamanho da flecha
    color: "#333",
    marginRight: 8,
  },
  nomeProfissional: {
    fontSize: 18,
    fontWeight: "bold",
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
    maxWidth: "75%",
  },
  mensagemUsuario: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  mensagemProfissional: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e1e1",
  },
  textoMensagem: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  botaoEnviar: {
    backgroundColor: "#007bff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoEnviarTexto: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: -5,
  },
});

export default TelaChatVendedor;
