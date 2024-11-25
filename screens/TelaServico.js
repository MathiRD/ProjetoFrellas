import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import MapView, { Marker } from 'react-native-maps';  // Importação do MapView

function TelaServico({ route, navigation }) {
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header com imagem de fundo */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: service.service_img }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay} />
          <View style={styles.overlayContent}>
            <Text style={styles.headerTitle}>{service.title}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Passo Fundo - RS</Text>
            </View>
            <View style={styles.headerStats}>
              <Text style={styles.stat}>⭐ +100 Serviços feitos</Text>
              <Text style={styles.stat}>
                ⭐ {service.experience} Anos no mercado
              </Text>
            </View>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        {/* Perfil */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: service.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{service.professionalName}</Text>
            <Text style={styles.profileRole}>{service.professionalRole}</Text>
          </View>
          <View style={styles.contactIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text>💬</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Galeria */}
        <View style={styles.galleryContainer}>
          <Text style={styles.sectionTitle}>Galeria</Text>
          <ScrollView horizontal>
            {service.galleryImages?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>

        {/* Mapa */}
        <View style={styles.mapPlaceholder}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: service.latitude || -28.2435, // Substitua pelo valor real de latitude
              longitude: service.longitude || -52.4096, // Substitua pelo valor real de longitude
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: service.latitude || -28.2435,
                longitude: service.longitude || -52.4096,
              }}
              title={service.title}
              description={service.description}
            />
          </MapView>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.price}>
            Preço estimado:{" "}
            <Text style={styles.priceValue}>R$: {service.priceRange}</Text>
          </Text>
          <CustomButton
            title="Contratar agora"
            onPress={() => alert("Contratação realizada com sucesso!")}
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
  headerContainer: {
    position: "relative",
    height: 250,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  locationText: {
    fontSize: 14,
    color: "#FFF",
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
    color: "#555",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: 14,
    color: "#777",
  },
  contactIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E8F0FE",
  },
  galleryContainer: {
    padding: 20,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: "#888",
  },
  footerContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceValue: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TelaServico;