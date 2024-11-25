import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

function TelaServico({ route, navigation }) {
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {}
        <View style={styles.headerContainer}>
          <Image source={{ uri: service.imageSource }} style={styles.headerImage} />
          {}
          <View style={styles.headerOverlay} />
          {}
          <View style={styles.overlayContent}>
            <Text style={styles.headerTitle}>{service.title}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Passo Fundo - RS</Text>
            </View>
            <View style={styles.headerStats}>
              <Text style={styles.stat}>⭐ +100 Serviços feitos</Text>
              <Text style={styles.stat}>⭐ {service.experience} Anos no mercado</Text>
            </View>
          </View>
        </View>

        {}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        {}
        <View style={styles.profileContainer}>
          <Image source={{ uri: service.profileImage }} style={styles.profileImage} />
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

        {}
        <View style={styles.galleryContainer}>
          <Text style={styles.sectionTitle}>Galeria</Text>
          {service.gallery && Array.isArray(service.gallery) && service.gallery.length > 0 ? (
            <ScrollView horizontal>
              {service.gallery.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noGalleryText}>Nenhuma imagem disponível</Text>
          )}
        </View>

        {}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Mapa será integrado aqui</Text>
        </View>

        {}
        <View style={styles.footerContainer}>
          <Text style={styles.price}>
            Preço estimado: <Text style={styles.priceValue}>R$: {service.priceRange}</Text>
          </Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Contratar agora</Text>
          </TouchableOpacity>
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
    marginLeft: 7, 
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
  noGalleryText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
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
  actionButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default TelaServico;
