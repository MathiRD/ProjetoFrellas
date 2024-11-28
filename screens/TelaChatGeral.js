import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator, // Importando o indicador de carregamento
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";

const TelaChatGeral = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro

  useEffect(() => {
    fetchUserSession();
  }, []);

  const formatCategory = (categoryValue) => {
    const categories = {
      dia_a_dia: "Dia a dia",
      manutencao: "Manutenção",
      tecnologia: "Tecnologia",
      mao_de_obra: "Mão de obra",
      jardinagem: "Jardinagem",
    };
  
    return categories[categoryValue] || categoryValue; // Retorna o valor formatado ou o valor original caso não exista no mapeamento
  };

  const fetchUserSession = async () => {
    try {
      const { data: session, error: sessionError } = await Supabase.auth.getSession();
      if (sessionError) throw new Error("Erro ao obter sessão");
      const user = session?.session?.user;
      if (!user) throw new Error("Usuário não encontrado");
      setUserId(user.id);
      fetchChats(user.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchChats = async (userId) => {
    if (!userId) return;
    try {
      const { data, error } = await Supabase
        .from("chats")
        .select("id, id_servico, id_usuario_dono, id_usuario_cliente")
        .or(`id_usuario_dono.eq.${userId},id_usuario_cliente.eq.${userId}`); // Buscando chats relacionados ao usuário
  
      if (error) throw error;
  
      const chatDetails = await Promise.all(
        data.map(async (chat) => {
          const { data: serviceData, error: serviceError } = await Supabase
            .from("services")
            .select("title, category, id_usuario")
            .eq("id", chat.id_servico)
            .single();
  
          if (serviceError) throw serviceError;
  
          return {
            ...chat,
            service: serviceData,
          };
        })
      );
  
      setChats(chatDetails);
      setLoading(false); // Dados carregados, podemos parar o carregamento
    } catch (err) {
      setError("Erro ao carregar os chats.");
      setLoading(false); // Caso haja erro, paramos o carregamento
    }
  };

  const renderServico = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.categoria}>
        {formatCategory(item.service.category)} - {item.service.title}
      </Text>
      <Text style={styles.detalhes}>
        Vendedor: {item.service.id_usuario === userId ? "Você" : "Outro"}
      </Text>
      <CustomButton
        title={item.service.id_usuario === userId ? "Falar com o cliente" : "Falar com vendedor"}
        onPress={() =>
          navigation.navigate("TelaChatVendedor", { servico: item.service, idChat: item.id })
        }
        style={styles.botao}
      />
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (chats.length === 0) {
      return <Text style={styles.errorText}>Nenhum chat encontrado.</Text>;
    }

    return (
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderServico}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<View style={{ height: 16 }} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.navigate("TelaChatVendedor")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.voltarTexto}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Serviços Solicitados</Text>
      </View>
      {renderContent()}
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
  separator: {
    height: 16,
  },
  botao: {
    marginTop: 10,
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});

export default TelaChatGeral;
