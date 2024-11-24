import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import CustomButton from "../src/components/CustomButton";  // Botão padrão do seu projeto

const TelaPerfil = ({ navigation }) => {
  // Dados mockados
  const mockUserData = {
    name: "Usuário Teste",
    country: "Brasil",
    region: "RS",
    profileImageUrl: "https://example.com/default-profile.png", // Placeholder da imagem de perfil
    coverImageUrl: "https://example.com/default-cover.png", // Placeholder da imagem de capa
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

  // Estados
  const [userData] = useState(mockUserData);
  const [services] = useState(mockServices);
  const [profileImage, setProfileImage] = useState(userData.profileImageUrl);

  // Função para escolher imagem
  const chooseImage = () => {
    const options = {
      title: "Selecionar Imagem",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("Usuário cancelou a seleção de imagem");
      } else if (response.error) {
        console.log("Erro:", response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          {/* Imagem de capa */}
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: userData.coverImageUrl }}
              style={styles.coverImage}
            />
          </View>

          {/* Imagem de perfil */}
          <TouchableOpacity onPress={chooseImage}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: profileImage || "https://example.com/default-profile.png",
                }}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.location}>
            {userData.country}, {userData.region}
          </Text>

          {/* Botões de ações padrão */}
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

      {/* Divisória entre os botões e a seção de serviços */}
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Últimos serviços consumidos</Text>

      {/* Scroll para os serviços */}
      <ScrollView horizontal={true} style={styles.servicesScroll}>
        {/* Card 1 */}
        <View style={styles.serviceCard}>
          <Image
            source={{
              uri: "https://weremote.net/wp-content/uploads/2022/07/paletas-colores-ordenador-escritorio.jpg",
            }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceDescription}>Design Gráfico</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.serviceCard}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.w49nn7CK_MYj1a7Y3wKB-AHaEK?rs=1&pid=ImgDetMain",
            }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceDescription}>Desenvolvimento de Website</Text>
        </View>

        {/* Card 3 */}
        <View style={styles.serviceCard}>
          <Image
            source={{
              uri: "https://opportunitymarketing.co.uk/wp-content/uploads/2020/12/Marketing_Campaign-graphic-scaled.jpg",
            }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceDescription}>Consultoria em Marketing</Text>
        </View>
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
  noServicesText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default TelaPerfil;
