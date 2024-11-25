import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Supabase from '../src/SupabaseClient';
import { useFocusEffect } from '@react-navigation/native';

function TelaInicial({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [populares, setPopulares] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockCards = [
    {
      id: '1',
      title: 'Mecânico',
      status: 'Aberto',
      description:
        'Manutenção básica, troca de óleo, troca de pastilhas de freio, filtro de oleo, e manutenções em geral',
      service_img:
        'https://cocupo.com/wp-content/uploads/2016/05/que-es-un-mecanico.jpg',
      category: 'Manutenção',
      priceRange: 200,
    },
    {
      id: '2',
      title: 'Eletricista',
      status: 'Aberto',
      description:
        'Serviço diarista para auxiliador de instalação elétrica residencial.',
      service_img:
        'https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg',
      category: 'Dia a Dia',
      priceRange: 500,
    },
    {
      id: '3',
      title: 'Encanador',
      status: 'Aberto',
      description:
        'Serviço diarista para auxílio em instalação doméstica de banheiros no ED Vivenda',
      service_img:
        'https://th.bing.com/th/id/R.6b7ce0e8a5dcf64078ca7db0c4f97e77?rik=vk6odBs898iVUQ&pid=ImgRaw&r=0',
      category: 'Dia a Dia',
      priceRange: 150,
    },
    {
      id: '4',
      title: 'Técnico TI',
      status: 'Aberto',
      description:
        'Prestação de suporte a formatação de computadores empresariais.',
      service_img:
        'https://th.bing.com/th/id/OIP.x7wjoKkNsXxnwlM8JX5BhgHaE8?rs=1&pid=ImgDetMain',
      category: 'Informatica',
      priceRange: 400,
    },
  ];

  const categories = [
    { label: 'Dia a Dia', value: 'dia_a_dia' },
    { label: 'Manutenção', value: 'manutencao' },
    { label: 'Tecnologia', value: 'tecnologia' },
    { label: 'Mão de obra', value: 'mao_de_obra' },
    { label: 'Jardinagem', value: 'jardinagem' },
  ];

  const fetchPopulares = async () => {
    try {
      setLoading(true);
      const { data, error } = await Supabase.from('services')
        .select('*')
        .order('title', { ascending: true });

      if (error) {
        console.error('Erro ao buscar serviços populares:', error);
      } else {
        setPopulares(data);
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPopulares();
    }, [])
  );

  const filteredPopulares = populares.filter(
    (popular) =>
      (popular.title.toLowerCase().includes(searchText.toLowerCase()) ||
        !searchText) &&
      (popular.category === selectedCategory || !selectedCategory)
  );

  const openMapModal = () => {
    setIsModalVisible(true);
  };

  const closeMapModal = () => {
    setIsModalVisible(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
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
              latitude: -28.26,
              longitude: -52.4091,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: -28.26, longitude: -52.4091 }}
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
                source={{ uri: card.service_img }}
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
              key={category.value}
              style={[
                styles.categoryItem,
                selectedCategory === category.value && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(category.value)}
            >
              <Text style={styles.categoryText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.popularesTitle]}>
          Populares
        </Text>

        <View style={styles.popularesContainer}>
          {loading ? (
            <Text style={styles.noItemsText}>Carregando...</Text>
          ) : filteredPopulares.length === 0 ? (
            <Text style={styles.noItemsText}>
              Nenhum item encontrado para essa categoria.
            </Text>
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
                    source={{ uri: popular.service_img }}
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
              latitude: -28.26,
              longitude: -52.4091,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: -28.26, longitude: -52.4091 }}
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
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
    color: "#333",
  },
  servicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 5,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
    color: "#007bff",
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
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#8c8c8c",
  },
  selectedCategory: {
    backgroundColor: "#ccc",
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
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
