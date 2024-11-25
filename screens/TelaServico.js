import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

function TelaServico({ route, navigation }) {
  const { service } = route.params;
  const [contactMessage, setContactMessage] = useState("");

  const handleContact = () => {
    alert(`Mensagem enviada: ${contactMessage}`);
    setContactMessage(""); // Limpar campo de mensagem
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho com imagem */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: service.imageSource }}
            style={styles.headerImage}
          />
        </View>

        {/* Detalhes do Serviço */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.status}>{service.status}</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        {/* Seção de contato */}
        <View style={styles.contactContainer}>
          <TextInput
            style={styles.input}
            placeholder="Deixe sua mensagem"
            value={contactMessage}
            onChangeText={setContactMessage}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button} onPress={handleContact}>
            <Text style={styles.buttonText}>Enviar Mensagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
  },
  // Cabeçalho com a imagem do serviço
  headerContainer: {
    height: 250,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  // Detalhes do serviço
  detailsContainer: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 26, // Tamanho maior para título
    fontWeight: "bold",
    color: "#333", // Cor escura
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    color: "#28a745", // Cor verde para status "Aberto"
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555", // Cor mais suave para a descrição
    lineHeight: 22,
    marginBottom: 20,
  },
  // Contato: Caixa de mensagem e botão
  contactContainer: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 120,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1e90ff", // Cor azul do botão
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18, // Tamanho de fonte maior
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default TelaServico;
