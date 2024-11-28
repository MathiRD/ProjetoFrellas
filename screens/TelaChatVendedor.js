import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Button
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Supabase from "../src/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";  // Importando o ícone do botão flutuante

const TelaChatVendedor = ({ navigation }) => {
  const route = useRoute();
  const { servico, idChat } = route.params || {}; // Recebe o idChat como parâmetro
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [usuarioAtualId, setUsuarioAtualId] = useState(null); // ID do usuário logado
  const [headerNome, setHeaderNome] = useState(""); // Nome exibido no header
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
  const [preco, setPreco] = useState(""); // Preço inserido no modal

  // Obter informações do usuário logado ao iniciar
  const fetchUsuarioAtual = async () => {
    try {
      const { data, error } = await Supabase.auth.getSession();
      if (error) throw error;

      const userId = data.session?.user?.id;
      if (userId) {
        setUsuarioAtualId(userId); // Define o ID do usuário logado
        fetchHeaderNome(userId); // Busca o nome correto para o header
      } else {
        Alert.alert("Erro", "Não foi possível obter o usuário logado.");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário atual:", err);
      Alert.alert("Erro", "Não foi possível obter o usuário logado.");
    }
  };

  const fetchHeaderNome = async (userId) => {
    try {
      if (userId === servico.id_usuario) {
        // Usuário é o dono do serviço, mostrar o nome do cliente
        const { data, error } = await Supabase
          .from("profiles")
          .select("username")
          .eq("id", userId)
          .single();

        if (error) throw error;
        setHeaderNome(data?.username || "Cliente");
      } else {
        // Usuário é o cliente, mostrar o nome do serviço
        setHeaderNome(`${servico.title}`);
      }
    } catch (err) {
      console.error("Erro ao buscar nome do header:", err);
      Alert.alert("Erro", "Não foi possível determinar o nome do header.");
    }
  };

  // Buscar mensagens do banco de dados
  const fetchMensagens = async () => {
    try {
      const { data, error } = await Supabase
        .from("mensagens")
        .select("id, id_chat, id_usuario, mensagem, data_hora, enviado_por_usuario, id_usuario_envio")
        .eq("id_chat", idChat)
        .order("data_hora", { ascending: false });

      if (error) {
        console.error("Erro ao buscar mensagens:", error);
        Alert.alert("Erro", "Não foi possível carregar as mensagens.");
        return;
      }

      setMensagens(data || []);
    } catch (err) {
      console.error("Erro inesperado ao buscar mensagens:", err);
      Alert.alert("Erro", "Não foi possível carregar as mensagens.");
    }
  };

  // Enviar nova mensagem
  const enviarMensagem = async () => {
    if (novaMensagem.trim() === "") return;

    try {
      const { error } = await Supabase
        .from("mensagens")
        .insert([
          {
            id_chat: idChat,
            mensagem: novaMensagem,
            enviado_por_usuario: true, // Define o emissor da mensagem
            id_usuario: servico.id_usuario,
            id_usuario_envio: usuarioAtualId,
          },
        ]);

      if (error) {
        console.error("Erro ao enviar mensagem:", error);
        Alert.alert("Erro", "Não foi possível enviar a mensagem.");
        return;
      }

      setNovaMensagem(""); // Limpa o campo de texto
      fetchMensagens(); // Atualiza as mensagens após enviar uma nova
    } catch (err) {
      console.error("Erro inesperado ao enviar mensagem:", err);
      Alert.alert("Erro", "Não foi possível enviar a mensagem.");
    }
  };

  useEffect(() => {
    fetchUsuarioAtual(); // Carrega o ID do usuário ao iniciar
    fetchMensagens(); // Carrega mensagens ao iniciar o chat
  }, [idChat]);

  const renderMensagem = ({ item }) => {
    const isUsuarioAtual = item.id_usuario_envio === usuarioAtualId;
  
    return (
      <View
        style={[
          styles.bolhaMensagem,
          isUsuarioAtual ? styles.mensagemUsuario : styles.mensagemProfissional,
          isUsuarioAtual ? styles.alinhadoDireita : styles.alinhadoEsquerda,
        ]}
      >
        <Text style={styles.textoMensagem}>{item.mensagem}</Text>
      </View>
    );
  };

  const gerarValor = async () => {
    if (preco.trim() === "") {
      Alert.alert("Erro", "Por favor, insira um preço.");
      return;
    }
  
    try {
      const { data: chatData, error: chatError } = await Supabase
        .from("chats")
        .select("id_usuario_cliente")
        .eq("id", idChat)
        .single();
  
      if (chatError) {
        console.error("Erro ao buscar o cliente do chat:", chatError);
        Alert.alert("Erro", "Não foi possível determinar o cliente.");
        return;
      }
  
      const idUsuarioCliente = chatData?.id_usuario_cliente;
  
      if (!idUsuarioCliente) {
        Alert.alert("Erro", "Cliente não encontrado para este chat.");
        return;
      }
  
      // Inserir o valor na tabela finanças
      const { error } = await Supabase
        .from("financas")
        .insert([
          {
            id_chat: idChat,
            id_usuario: servico.id_usuario, // Dono do serviço
            id_usuario_cliente: idUsuarioCliente, // Cliente correto
            valor: parseFloat(preco),
            descricao: servico.title,
          },
        ]);
  
      if (error) {
        console.error("Erro ao registrar pendência:", error);
        Alert.alert("Erro", "Não foi possível gerar a pendência financeira.");
      } else {
        Alert.alert("Sucesso", "Pendência financeira gerada com sucesso!");
        setModalVisible(false); // Fecha o modal após sucesso
      }
    } catch (err) {
      console.error("Erro inesperado ao gerar pendência:", err);
      Alert.alert("Erro", "Não foi possível gerar a pendência financeira.");
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.nomeProfissional}>{headerNome}</Text>
      </View>

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMensagem}
        contentContainerStyle={styles.listaMensagens}
        inverted={true} // Inverte a lista para que as mensagens mais recentes apareçam no topo
        showsVerticalScrollIndicator={false} // Opcional
      />

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

      {usuarioAtualId === servico.id_usuario && (
        <TouchableOpacity
          style={styles.botaoFlutuante}
          onPress={() => setModalVisible(true)} // Exibe o modal
        >
          <Ionicons name="add-circle" size={60} color="#007bff" />
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite o preço combinado</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: 1000"
              keyboardType="numeric"
              value={preco}
              onChangeText={setPreco}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Gerar" onPress={gerarValor} />
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 30,
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
    paddingBottom: 20, // Adiciona espaço no final para o input
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
    backgroundColor: "#019",
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
  },
  // Botão flutuante no canto superior direito
  botaoFlutuante: {
    position: "absolute",
    top: 50, // Alinha no topo, considerando o paddingTop de 40 no container
    right: 16, // Alinha à direita com um pequeno espaço
    backgroundColor: "#ccc", // Cor do botão para se destacar
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Adiciona sombra para destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
   inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },
  botaoEnviar: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoEnviarTexto: {
    color: "#fff",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default TelaChatVendedor;