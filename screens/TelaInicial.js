import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function TelaInicial({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mockCards = [
    {
      id: "1",
      title: "Mecânico",
      status: "Aberto",
      description:
        "Manutenção básica, troca de óleo, troca de pastilhas de freio, filtro de oleo, e manutenções em geral",
      imageSource:
        "https://cocupo.com/wp-content/uploads/2016/05/que-es-un-mecanico.jpg",
      category: "Manutenção"
    },
    {
      id: "2",
      title: "Eletricista",
      status: "Aberto",
      description:
        "Serviço diarista para auxiliador de instalação elétrica residencial.",
      imageSource:
        "https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg",
      category: "Dia a Dia"
    },
    {
      id: "3",
      title: "Encanador",
      status: "Aberto",
      description:
        "Serviço diarista para auxílio em instalação doméstica de banheiros no ED Vivenda",
      imageSource:
        "https://th.bing.com/th/id/R.6b7ce0e8a5dcf64078ca7db0c4f97e77?rik=vk6odBs898iVUQ&pid=ImgRaw&r=0",
      category: "Dia a Dia"
    },
    {
      id: "4",
      title: "Técnico TI",
      status: "Aberto",
      description:
        "Prestação de suporte a formatação de computadores empresariais.",
      imageSource:
        "https://th.bing.com/th/id/OIP.x7wjoKkNsXxnwlM8JX5BhgHaE8?rs=1&pid=ImgDetMain",
      category: "Informatica"
    },
  ];

  const mockPopulares = [
    {
      id: "1",
      title: "Pintor Residencial",
      description:
        "Pintura de paredes internas e externas. Serviço altamente recomendado pelos clientes.",
      imageSource:
        "https://guia.ar/wp-content/uploads/2021/02/servise-image-5.jpg",
      category: "Dia a Dia"
    },
    {
      id: "2",
      title: "Montador de Móveis",
      description:
        "Diarista com montagens de móveis planejados. Com ótima reputação e atendendo diversas demandas.",
      imageSource:
        "https://www.lhmontagemdemoveis.com.br/wp-content/uploads/2019/11/Montador-De-M%C3%B3veis-EM-Salvador-BA.png",
      category: "Mão de obra"
    },
    {
      id: "3",
      title: "Doméstica",
      description:
        "Diarista Doméstica. Empresa especializada há mais de 10 anos.",
      imageSource:
        "https://vejasp.abril.com.br/wp-content/uploads/2016/12/domestica_-divulgacao-desvia-3-1.jpeg?quality=70&strip=info&w=928",
      category: "Dia a Dia"
    },
    {
      id: "4",
      title: "Jardinagem",
      description:
        "Manutenção de jardins, poda de árvores e plantas. Empresa destaque no ramo.",
      imageSource:
        "https://img.freepik.com/free-photo/smiling-afro-gardener-using-hedge-trimmer-cutting-bushes_651396-1479.jpg",
      category: "Jardinagem"
    },
  ];

  const categories = ["Dia a Dia", "Informatica", "Mão de obra", "Jardinagem", "Manutenção"];

  const filteredPopulares = mockPopulares.filter((popular) =>
    (popular.title.toLowerCase().includes(searchText.toLowerCase()) || !searchText) &&
    (popular.category === selectedCategory || !selectedCategory)
  );

  const openMapModal = () => {
    setIsModalVisible(true);
  };

  const closeMapModal = () => {
    setIsModalVisible(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TouchableOpacity onPress={openMapModal} style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -28.2600,
              longitude: -52.4091,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: -28.2600, longitude: -52.4091 }}
              title="Passo Fundo"
              description="Cidade de Passo Fundo, Rio Grande do Sul"
            />
          </MapView>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Serviços em Destaque</Text>
        <ScrollView horizontal style={styles.servicesContainer}>
          {mockCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() =>
                navigation.navigate("TelaServico", { service: card })
              }
              style={styles.card}
            >
              <Image
                source={{ uri: card.imageSource }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardStatus}>{card.status}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Serviço"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        <ScrollView horizontal style={styles.categoriesCarousel}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.popularesTitle]}>
          Populares
        </Text>

        <View style={styles.popularesContainer}>
          {filteredPopulares.length === 0 ? (
            <Text style={styles.noItemsText}>Nenhum item encontrado para essa categoria.</Text>
          ) : (
            <ScrollView style={styles.popularesCarousel}>
              {filteredPopulares.map((popular) => (
                <TouchableOpacity
                  key={popular.id}
                  onPress={() =>
                    navigation.navigate("TelaServico", { service: popular })
                  }
                  style={styles.popularCard}
                >
                  <Image
                    style={styles.popularImage}
                    source={{ uri: popular.imageSource }}
                  />
                  <View style={styles.popularTextContainer}>
                    <Text style={styles.popularTitle}>{popular.title}</Text>
                    <Text style={styles.popularDescription}>
                      {popular.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={closeMapModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeMapModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <MapView
            style={styles.mapFullscreen}
            initialRegion={{
              latitude: -28.2600,
              longitude: -52.4091,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: -28.2600, longitude: -52.4091 }}
              title="Passo Fundo"
              description="Cidade de Passo Fundo, Rio Grande do Sul"
            />
          </MapView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mainScroll: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  mapText: {
    position: "absolute",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    top: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  servicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    margin: 5,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  cardStatus: {
    fontSize: 12,
    color: "gray",
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  categoriesCarousel: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  popularesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    minHeight: 200,
  },
  popularesCarousel: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  noItemsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  popularesTitle: {
    marginTop: 20,
  },
  popularCard: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 25,
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  popularTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  popularDescription: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  mapFullscreen: {
    width: "100%",
    height: "100%",
  },
});

export default TelaInicial;