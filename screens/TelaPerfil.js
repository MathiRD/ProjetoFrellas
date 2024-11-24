import React, { useState, useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";

const TelaPerfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg";

  // Mocked User Data
  const mockUserData = {
    name: "Usuário Teste",
    country: "Brasil",
    region: "RS",
    profileImageUrl: defaultImageUrl,
    coverImageUrl: "https://example.com/default-cover.png",
  };

  const mockServices = [
    {
      id: 1,
      description: "Serviço de design gráfico",
      imageUrl: "https://example.com/service1.png",
    },
    {
      id: 2,
      description: "Desenvolvimento de website",
      imageUrl: "https://example.com/service2.png",
    },
    {
      id: 3,
      description: "Consultoria em marketing digital",
      imageUrl: "https://example.com/service3.png",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: session, error: sessionError } = await Supabase.auth.getSession();

        if (sessionError) {
          setError("Erro ao obter sessão");
          return;
        }

        const user = session?.session?.user;

        if (user) {
          const userId = user.id;

          const { data, error } = await Supabase
            .from("profiles")
            .select("id, username, full_name, avatar_url, website")
            .eq("id", userId)
            .single();

          if (error) {
            setError(error.message);
          } else {
            setUserData(data);
            setProfileImage(data.avatar_url || defaultImageUrl);
          }
        } else {
          setError("Sessão ou usuário não encontrados.");
        }
      } catch (err) {
        setError("Erro ao carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const saveImageUrl = async (url) => {
    try {
      const { data, error } = await Supabase
        .from("profiles")
        .update({ avatar_url: url })
        .eq("id", userData.id);

      if (error) {
        console.log("Erro ao atualizar a imagem de perfil:", error.message);
        setError("Erro ao atualizar imagem de perfil.");
      } else {
        console.log("Imagem de perfil atualizada com sucesso!");
      }
    } catch (err) {
      console.log("Erro ao salvar a URL da imagem:", err);
      setError("Erro ao salvar a URL da imagem.");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleLinkSubmit = () => {
    if (imageUrl) {
      setProfileImage(imageUrl);
      saveImageUrl(imageUrl); // Salva a URL do link no banco de dados
      setModalVisible(false);
      setImageUrl(""); // Limpa o campo
    } else {
      console.log("Link inválido");
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{`Erro: ${error}`}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: userData.coverImageUrl }}
              style={styles.coverImage}
            />
          </View>

          <TouchableOpacity onPress={openModal}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: profileImage || defaultImageUrl,
                }}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{userData.username}</Text>
          <Text style={styles.location}>
            {userData.country || "Brasil"}, {userData.region || "RS"}
          </Text>

          <CustomButton
            title="Editar Perfil"
            onPress={() => navigation.navigate("TelaEditarPerfil")}
          />
          <CustomButton
            title="Se tornar um vendedor"
            onPress={() => navigation.navigate("TelaTornarVendedor")}
          />
        </View>
      )}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Últimos serviços consumidos</Text>

      <ScrollView horizontal={true} style={styles.servicesScroll}>
        {mockServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Image
              source={{ uri: service.imageUrl }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Insira o link da imagem</Text>
            <TextInput
              style={styles.input}
              placeholder="Cole o link da imagem"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button title="Confirmar" onPress={handleLinkSubmit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverImageContainer: {
    backgroundColor: "#f0f0f0",
    width: "200%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileImageContainer: {
    backgroundColor: "#f0f0f0",
    width: 150,
    height: 150,
    borderRadius: 65,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -70,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
    width: "100%",
  },
  servicesScroll: {
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default TelaPerfil;