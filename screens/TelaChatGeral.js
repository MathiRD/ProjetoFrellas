import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../src/components/CustomButton";

const TelaChatGeral = ({ navigation }) => {
  const servicos = [
    {
      id: "1",
      categoria: "Pintor",
      nomeProfissional: "João",
      detalhes: "5 Autônomos.\nPresencial.\nPintar somente uma parede.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
    {
      id: "2",
      categoria: "Eletricista",
      nomeProfissional: "Fábio",
      detalhes: "5 Autônomos.\nPresencial.\nInstalar o lustre na sala.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
    {
      id: "3",
      categoria: "Encanador",
      nomeProfissional: "Jorge",
      detalhes: "5 Autônomos.\nPresencial.\nInstalar a pia da cozinha.",
      prazo: "Até 22 de Fevereiro de 2022.",
    },
  ];

  const renderServico = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.categoria}>
        {item.categoria} - {item.nomeProfissional}
      </Text>
      <Text style={styles.detalhes}>{item.detalhes}</Text>
      <Text style={styles.prazo}>{item.prazo}</Text>
      <CustomButton
        title="Falar com vendedor"
        onPress={() =>
          navigation.navigate("TelaChatVendedor", { servico: item })
        }
        style={styles.botao} // Adicione estilos personalizados, se necessário
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.navigate("Início")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.voltarTexto}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Serviços Solicitados</Text>
      </View>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderServico}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<View style={{ height: 16 }} />} // Espaçamento acima do primeiro card
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
    position: "relative",
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  voltar: {
    position: "absolute",
    top: 50,
    left: 15,
    padding: 10,
  },
  voltarTexto: {
    fontSize: 24,
    color: "#333",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  separator: {
    height: 16,
  },
});

export default TelaChatGeral;
