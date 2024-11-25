import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

const pagamentosIniciais = {
  pagos: [
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
      valor: "300",
      data: "10/10/2024",
      status: "Pago",
      profissional: "Eletricista - Fábio",
    },
    {
      id: "3",
      titulo: "Instalação da pia da cozinha",
      valor: "400",
      data: "15/10/2024",
      status: "Pago",
      profissional: "Encanador - Jorge",
    },
  ],
  pendentes: [
    {
      id: "1",
      titulo: "Cortar a grama",
      valor: "50",
      data: "02/12/2024",
      status: "Pendente",
      profissional: "Jardineiro - Paulo",
    },
    {
      id: "2",
      titulo: "Limpeza completo no apto",
      valor: "469",
      data: "04/12/2024",
      status: "Pendente",
      profissional: "Doméstica - Jaqueline",
    },
    {
      id: "3",
      titulo: "Formatar 3 computadores",
      valor: "250",
      data: "30/11/2024",
      status: "Pendente",
      profissional: "Técnico TI - Rômulo",
    },
  ],
};

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

const PagosTab = ({ pagamentos }) => (
  <FlatList
    data={pagamentos}
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

const PendentesTab = ({ pagamentos }) => (
  <FlatList
    data={pagamentos}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <CardPagamento
        titulo={item.titulo}
        valor={item.valor}
        data={item.data}
        status="Pendente"
        profissional={item.profissional}
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
  const [searchQuery, setSearchQuery] = useState("");
  const [pagamentos, setPagamentos] = useState(pagamentosIniciais);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredPagos = pagamentosIniciais.pagos.filter((item) =>
      item.titulo.toLowerCase().includes(query.toLowerCase())
    );
    const filteredPendentes = pagamentosIniciais.pendentes.filter((item) =>
      item.titulo.toLowerCase().includes(query.toLowerCase())
    );

    setPagamentos({
      pagos: filteredPagos,
      pendentes: filteredPendentes,
    });
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "pagos":
        return <PagosTab pagamentos={pagamentos.pagos} />;
      case "pendentes":
        return <PendentesTab pagamentos={pagamentos.pendentes} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por pagamentos"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
