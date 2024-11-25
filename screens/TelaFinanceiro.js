import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

const pagos = [
  {
    id: "1",
    titulo: "Pintura de uma parede",
    valor: "169",
    data: "05/10/2024",
    status: "Pago",
    profissional: "Pintor - João",
  },
  {
    id: "2",
    titulo: "Instalação do lustre na sala",
    valor: "269",
    data: "10/10/2024",
    status: "Pago",
    profissional: "Eletricista - Fábio",
  },
  {
    id: "3",
    titulo: "Instalação da pia da cozinha",
    valor: "369",
    data: "15/10/2024",
    status: "Pago",
    profissional: "Encanador - Jorge",
  },
];


const pendentes = [
  {
    id: "1",
    titulo: "Pintura casa",
    valor: "200",
    data: "12/10/2024",
    status: "Pendente",
  },
  {
    id: "2",
    titulo: "Pintura casa",
    valor: "200",
    data: "12/10/2024",
    status: "Pendente",
  },
];


const CardPagamento = ({ titulo, valor, data, status, profissional }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      <Text
        style={[
          styles.cardValue,
          status === "Pago" ? styles.green : styles.red,
        ]}
      >
        R$ {valor}
      </Text>
    </View>
    <Text style={styles.cardDate}>
      {status === "Pago" ? "Pago em:" : "Vencimento:"} {data}
    </Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardUser}>{profissional}</Text>
      <Text style={styles.cardStatus}>Inativo</Text>
    </View>
  </View>
);

const PagosTab = () => (
  <FlatList
    data={pagos}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <CardPagamento
        titulo={item.titulo}
        valor={item.valor}
        data={item.data}
        status="Pago"
        profissional={item.profissional}
      />
    )}
  />
);

const PendentesTab = () => (
  <FlatList
    data={pendentes}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <CardPagamento
        titulo={item.titulo}
        valor={item.valor}
        data={item.data}
        status="Pendente"
      />
    )}
  />
);


const TelaFinanceiro = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pagos", title: "Pagos" },
    { key: "pendentes", title: "Pendências" },
  ]);

  const renderScene = SceneMap({
    pagos: PagosTab,
    pendentes: PendentesTab,
  });

  return (
    <View style={styles.container}>
      { }
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por pagamentos"
        />
      </View>

      { }
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator} 
            style={styles.tabBar} 
            labelStyle={styles.tabLabel} 
            activeColor="#007AFF" 
            inactiveColor="#000000" 
          />

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 16,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E5E9F2",
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardUser: {
    fontSize: 14,
    color: "#666",
  },
  cardStatus: {
    fontSize: 14,
    color: "red",
  },
  tabBar: {
    backgroundColor: "#E5E9F2", 
  },
  tabIndicator: {
    backgroundColor: "#007AFF", 
    height: 3, 
  },
  tabLabel: {
    fontWeight: "bold", 
    fontSize: 14, 
  },
});

export default TelaFinanceiro;
