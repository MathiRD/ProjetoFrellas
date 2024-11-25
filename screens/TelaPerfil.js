import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";

const TelaPerfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg";
  const defaultBannerUrl =
    "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75";

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
        const { data: session, error: sessionError } =
          await Supabase.auth.getSession();

        if (sessionError) {
          setError("Erro ao obter sessão");
          return;
        }

        const user = session?.session?.user;

        if (user) {
          const userId = user.id;

          const { data, error } = await Supabase.from("profiles")
            .select(
              "id, username, full_name, avatar_url, banner_url, country, city, uf"
            )
            .eq("id", userId)
            .single();

          if (error) {
            setError(error.message);
          } else {
            setUserData(data);
            setProfileImage(data.avatar_url || defaultImageUrl);
            setBannerImage(data.banner_url || defaultBannerUrl);
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

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>falha ao carregar dados do usuário</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          <View style={styles.coverImageContainer}>
            <Image source={{ uri: bannerImage }} style={styles.coverImage} />
          </View>

          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: profileImage || defaultImageUrl,
              }}
              style={styles.profileImage}
            />
          </View>

          <Text style={styles.userName}>{userData.username}</Text>
          <Text style={styles.location}>
            {userData.city || "Cidade"}, {userData.uf || "UF"}
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

      <Text style={styles.sectionTitle}>Meus Serviços</Text>

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
    width: "100%",
    height: 200,
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
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -70,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 180,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
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
});

export default TelaPerfil;
