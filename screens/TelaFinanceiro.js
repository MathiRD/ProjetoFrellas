import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import Supabase from "../src/SupabaseClient";

const fetchPagamentos = async (userId) => {
  const { data, error } = await Supabase
    .from("financas")
    .select("*")
    .order("data_criacao", { ascending: false });

  if (error) {
    console.error(error);
    return { pagos: [], pendentes: [], cobrancas: [] };
  }

  const pagos = data.filter(
    (item) => item.status === "Pago" && item.id_usuario !== userId
  );
  const pendentes = data.filter(
    (item) => item.status !== "Pago" && item.id_usuario !== userId
  );
  const cobrancas = data.filter((item) => item.id_usuario === userId);

  return { pagos, pendentes, cobrancas };
};

const CardPagamento = ({ titulo, valor, data, status, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress || (() => {})}
    disabled={!onPress}
  >
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
      Gerado em: {data}
    </Text>
  </TouchableOpacity>
);

const CobrancasTab = ({ pagamentos, onCardPress }) => (
  <FlatList
    data={pagamentos}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <CardPagamento
        titulo={item.descricao}
        valor={item.valor.toFixed(2)}
        data={new Date(item.data_criacao).toLocaleDateString()}
        status={item.status}
        onPress={onCardPress ? () => onCardPress(item) : null}
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
    { key: "cobrancas", title: "Cobranças" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagamentos, setPagamentos] = useState({
    pagos: [],
    pendentes: [],
    cobrancas: [],
  });
  const [filteredPagamentos, setFilteredPagamentos] = useState({
    pagos: [],
    pendentes: [],
    cobrancas: [],
  });
  const [userId, setUserId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUserSession();
  }, []);

  const fetchUserSession = async () => {
    try {
      const { data: session, error: sessionError } = await Supabase.auth.getSession();
      if (sessionError) throw new Error("Erro ao obter sessão");
      const user = session?.session?.user;
      if (!user) throw new Error("Usuário não encontrado");
      setUserId(user.id);
      loadPagamentos(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPagamentos = async (userId) => {
    if (!userId) return;
    const dados = await fetchPagamentos(userId);
    setPagamentos(dados);
    setFilteredPagamentos(dados);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredPagamentos(pagamentos);
      return;
    }

    const filteredPagos = pagamentos.pagos.filter((item) =>
      item.descricao.toLowerCase().includes(query.toLowerCase())
    );
    const filteredPendentes = pagamentos.pendentes.filter((item) =>
      item.descricao.toLowerCase().includes(query.toLowerCase())
    );
    const filteredCobrancas = pagamentos.cobrancas.filter((item) =>
      item.descricao.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPagamentos({
      pagos: filteredPagos,
      pendentes: filteredPendentes,
      cobrancas: filteredCobrancas,
    });
  };

  const handleCardPress = (card) => {
    setSelectedCard({ ...card, originalStatus: card.status });
    setModalVisible(true);
  };

  const handleStatusChange = async () => {
    try {
      const novoStatus = selectedCard.status === "Pago" ? "Pendente" : "Pago";
  
      const { error } = await Supabase
        .from("financas")
        .update({ status: novoStatus })
        .eq("id", selectedCard.id);
  
      if (error) throw error;
  
      loadPagamentos(userId);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "pagos":
        return (
          <CobrancasTab
            pagamentos={filteredPagamentos.pagos}
            onCardPress={null}
          />
        );
      case "pendentes":
        return (
          <CobrancasTab
            pagamentos={filteredPagamentos.pendentes}
            onCardPress={null}
          />
        );
      case "cobrancas":
        return (
          <CobrancasTab
            pagamentos={filteredPagamentos.cobrancas}
            onCardPress={handleCardPress}
          />
        );
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
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCard?.descricao}</Text>
            <Text>Valor: R$ {selectedCard?.valor.toFixed(2)}</Text>
            <Button
              title={selectedCard?.status === "Pago" ? "Reverter para Pendente" : "Marcar como Pago"}
              onPress={handleStatusChange}
            />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default TelaFinanceiro;