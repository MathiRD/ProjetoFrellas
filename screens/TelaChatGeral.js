import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Certifique-se de ter @expo/vector-icons instalado

const TelaChatGeral = ({ navigation }) => {
  const servicos = [
    {
      id: "1",
      categoria: "Pintor",
      detalhes: "5 Autônomos.\nPresencial.\nPintar somente uma parede.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
    {
      id: "2",
      categoria: "Eletricista",
      detalhes: "5 Autônomos.\nPresencial.\nInstalar o lustre na sala.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
    {
      id: "3",
      categoria: "Encanador",
      detalhes: "5 Autônomos.\nPresencial.\nInstalar a pia da cozinha.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
  ];

  const renderServico = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.categoria}>{item.categoria}</Text>
      <Text style={styles.detalhes}>{item.detalhes}</Text>
      <Text style={styles.prazo}>{item.prazo}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("TelaChatVendedor")}
      >
        <Text style={styles.botaoTexto}>Falar com vendedor</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        {/* Botão de Voltar */}
        <TouchableOpacity
          style={styles.voltar}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }], // Redefine a pilha para garantir que o usuário volte à Home
            })
          }
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Serviços Solicitados</Text>
      </View>

      {/* Lista de serviços */}
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderServico}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  voltar: {
    marginRight: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Faz o título ocupar o espaço restante
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  categoria: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  prazo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  botao: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
  },
  separator: {
    height: 16,
  },
});

export default TelaChatGeral;
