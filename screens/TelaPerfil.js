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
import CustomButton from "../src/components/CustomButton";

const TelaPerfil = ({ navigation }) => {
  // Dados mockados
  const mockUserData = {
    name: "Usuário Teste",
    country: "Brasil",
    region: "RS",
    profileImageUrl: "https://example.com/default-profile.png",
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
  ];

  // Estados
  const [userData] = useState(mockUserData);
  const [services] = useState(mockServices);
  const [profileImage, setProfileImage] = useState(
    mockUserData.profileImageUrl
  );

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
          <TouchableOpacity onPress={chooseImage}>
            <Image
              source={{
                uri: profileImage || "https://example.com/default-profile.png",
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.location}>
            {userData.country}, {userData.region}
          </Text>

          {/* Botões de ações */}
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

      <Text style={styles.sectionTitle}>Últimos serviços consumidos</Text>

      {services.length > 0 ? (
        services.map((service) => (
          <View key={service.id} style={styles.serviceContainer}>
            <Image
              source={{ uri: service.imageUrl }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noServicesText}>
          Nenhum serviço consumido ainda.
        </Text>
      )}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  serviceDescription: {
    fontSize: 16,
    flex: 1,
  },
  noServicesText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default TelaPerfil;
