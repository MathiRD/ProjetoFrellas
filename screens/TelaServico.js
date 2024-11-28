import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import MapView, { Marker } from "react-native-maps";
import Supabase from "../src/SupabaseClient";

function TelaServico({ route, navigation }) {
  const { service, coordinates, price, galleryImages } = route.params;
  const [averageRating, setAverageRating] = useState(service.average_rating || 0);
  const [userRating, setUserRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserSession();
    fetchRatings();
  }, []);

  const imagesToDisplay = galleryImages?.length > 0 && galleryImages[0] !== "" ? galleryImages : null;

  const fetchUserSession = async () => {
    try {
      const { data: session, error: sessionError } = await Supabase.auth.getSession();
      if (sessionError) throw new Error("Erro ao obter sessão");
      const user = session?.session?.user;
      if (!user) throw new Error("Usuário não encontrado");
      setUserId(user.id);
    } catch (err) {
      Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const { data, error } = await Supabase.from("rating")
        .select("rating")
        .eq("id_service", service.id);

      if (error) throw error;

      if (data.length) {
        const average =
          data.reduce((total, rating) => total + rating.rating, 0) /
          data.length;
        setAverageRating(parseFloat(average.toFixed(1)));
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar as avaliações.");
    }
  };

  const contratarServico = async () => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
  
    // Verificar se o usuário está tentando contratar seu próprio serviço
    if (service.id_usuario === userId) {
      Alert.alert("Erro", "Você não pode contratar seu próprio serviço.");
      return;
    }
  
    try {
      // Verificar se o chat já existe para este serviço entre os dois usuários
      const { data: existingChat, error: chatError } = await Supabase.from("chats")
        .select("*")
        .eq("id_servico", service.id)
        .or(`id_usuario_dono.eq.${service.id_usuario},id_usuario_cliente.eq.${userId}`)
        .single();
  
      if (chatError && chatError.code !== "PGRST116") throw chatError; // Tratar erro, exceto "não encontrado"
  
      if (existingChat) {
        // Se o chat já existe, redirecionar para ele
        navigation.navigate("TelaChatGeral", { chatId: existingChat.id });
        return;
      }
  
      // Criar um novo chat se não existir
      const { data: newChat, error: newChatError } = await Supabase.from("chats").insert([
        {
          id_usuario_dono: service.id_usuario, // Dono do serviço
          id_usuario_cliente: userId, // Cliente (usuário logado)
          id_servico: service.id, // Serviço relacionado ao chat
        },
      ]).single();
  
      if (newChatError) throw newChatError;
  
      // Redirecionar para o chat criado
      navigation.navigate("TelaChatGeral", { chatId: newChat.id });
    } catch (err) {
      Alert.alert("Erro", "Não foi possível criar o chat.");
      console.error(err);
    }
  };

  // Função para enviar a avaliação
  const submitRating = async () => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
  
    try {
      // Verificar se o usuário já avaliou o serviço
      const { data: existingRating, error: fetchError } = await Supabase.from("rating")
        .select("rating")
        .eq("id_service", service.id)
        .eq("id_usuario", userId)
        .single();  // Pega um único registro, se houver
  
      if (fetchError && fetchError.code !== 'PGRST116') { // Tratamento de erro para "sem dados"
        throw fetchError;
      }
  
      let newAverage;
      let isGreatService;
  
      if (existingRating) {
        // Se o usuário já avaliou, atualizar a avaliação
        const { error: updateError } = await Supabase.from("rating")
          .update({ rating: userRating })  // Atualiza a avaliação existente
          .eq("id_service", service.id)
          .eq("id_usuario", userId);
  
        if (updateError) throw updateError;
      } else {
        // Caso contrário, inserir uma nova avaliação
        const { error: insertError } = await Supabase.from("rating").insert({
          id_service: service.id,
          id_usuario: userId,
          rating: userRating,
        });
  
        if (insertError) throw insertError;
      }
  
      // Recalcular a média das avaliações
      const { data, error: avgError } = await Supabase.from("rating")
        .select("rating")
        .eq("id_service", service.id);
  
      if (avgError) throw avgError;
  
      newAverage =
        data.reduce((total, r) => total + r.rating, 0) / data.length;
  
      // Verificar se a média de avaliações é maior que 4.5 e atualizar o campo great_service
      isGreatService = newAverage > 4.5;

      const { error: updateError } = await Supabase.from("services")
        .update({
          average_rating: newAverage,
          great_service: isGreatService, // Atualizando o campo great_service
        })
        .eq("id", service.id);
  
      if (updateError) throw updateError;
  
      // Atualizar a média localmente e exibir sucesso
      setAverageRating(parseFloat(newAverage.toFixed(1)));
      Alert.alert("Sucesso", "Avaliação enviada com sucesso!");
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Erro", err.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: service.service_img }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <View style={styles.overlayContent}>
            <Text style={styles.headerTitle}>{service.title}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{service.description}</Text>
            </View>
          </View>
        </View>

        {/* Avaliação */}
        <View style={styles.ratingContainer}>
          <Text style={styles.sectionTitle}>Avaliação</Text>
          <View style={styles.ratingContent}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={[
                    styles.star,
                    { color: star <= averageRating ? "#FFD700" : "#CCC" },
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.rateButton}
            >
              <Text style={styles.rateButtonText}>Avalie!</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal para avaliação */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha sua Avaliação</Text>
              <View style={styles.modalStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                    <Text
                      style={[
                        styles.star,
                        { color: star <= userRating ? "#FFD700" : "#CCC" },
                      ]}
                    >
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                onPress={submitRating}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Galeria */}
        <View style={styles.galleryContainer}>
        <Text style={styles.sectionTitle}>Galeria</Text>
          {imagesToDisplay ? (
            <ScrollView horizontal style={styles.galleryScroll}>
              {imagesToDisplay.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noImagesText}>Sem imagens disponíveis.</Text>
          )}
        </View>

        {/* Mapa */}
        <View style={styles.mapPlaceholder}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates[0] ? coordinates[0] : -23.55052,
              longitude: coordinates[1] ? coordinates[1] : -46.633308,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: coordinates[0] ? coordinates[0] : -23.55052,
                longitude: coordinates[1] ? coordinates[1] : -46.633308,
              }}
              title={service.title}
              description={service.description}
            />
          </MapView>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.price}>
            <Text style={styles.priceValue}>R$: {price.toFixed(2)}</Text>
          </Text>
          <CustomButton
            title="Contratar agora"
            onPress={contratarServico}
          />
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Para sombras no Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalStars: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    color: "#FFD700",
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    padding: 20,
  },
  ratingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  rateButton: {
    marginLeft: 20,
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  rateButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  overlayContent: {
    position: "absolute",
    top: "20%",
    left: 20,
    right: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationIcon: {
    fontSize: 18,
    color: "#FFF",
  },
  locationText: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 5,
  },
  headerStats: {
    marginTop: 10,
  },
  stat: {
    fontSize: 14,
    color: "#FFF",
  },
  detailsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  galleryContainer: {
    padding: 20,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  mapPlaceholder: {
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  footerContainer: {
    padding: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceValue: {
    color: "#007BFF",
  },
});

export default TelaServico;