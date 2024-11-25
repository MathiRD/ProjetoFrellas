import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../src/components/CustomButton"; // Botão padrão do projeto

const TelaServico = ({ route, navigation }) => {
  // Dados mockados para o serviço (você pode substituir com os dados reais via props ou API)
  const { serviceData } = route.params || {
    serviceData: {
      title: "Pintura de Casa",
      price: "R$ 200",
      paymentDate: "12/10/2024",
      status: "Inativo",
      sellerName: "Lucas Pintor",
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de fundo do serviço */}
      <Image
        source={{ uri: serviceData.backgroundImageUrl }}
        style={styles.backgroundImage}
      />

      {/* Imagem de perfil do vendedor */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: serviceData.profileImageUrl }}
          style={styles.profileImage}
        />
      </View>

      {/* Detalhes do serviço */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{serviceData.title}</Text>
        <Text style={styles.price}>{serviceData.price}</Text>
        <Text style={styles.label}>
          Pago em: <Text style={styles.value}>{serviceData.paymentDate}</Text>
        </Text>
        <Text style={styles.label}>
          Status:{" "}
          <Text
            style={[
              styles.value,
              serviceData.status === "Ativo"
                ? styles.activeStatus
                : styles.inactiveStatus,
            ]}
          >
            {serviceData.status}
          </Text>
        </Text>
        <Text style={styles.label}>
          Vendedor: <Text style={styles.value}>{serviceData.sellerName}</Text>
        </Text>
      </View>

      {/* Botão para voltar */}
      <CustomButton
        title="Voltar"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50, // Sobreposição da imagem de perfil na imagem de fundo
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
  },
  value: {
    fontWeight: "400",
    fontSize: 16,
  },
  activeStatus: {
    color: "green",
  },
  inactiveStatus: {
    color: "red",
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default TelaServico;
