import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

function TelaInicial({ navigation }) {
  const [searchText, setSearchText] = useState("");

  // Dados dos serviços
  const mockCards = [
    {
      id: "1",
      title: "Mecânico",
      status: "Aberto",
      description:
        "Manutenção básica, troca de óleo, troca de pastilhas de freio, filtro de oleo, e manutenções em geral",
      imageSource:
        "https://cocupo.com/wp-content/uploads/2016/05/que-es-un-mecanico.jpg",
    },
    {
      id: "2",
      title: "Eletricista",
      status: "Aberto",
      description:
        "Serviço diarista para auxiliador de instalação elétrica residencial.",
      imageSource:
        "https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg",
    },
    {
      id: "3",
      title: "Encanador",
      status: "Aberto",
      description:
        "Serviço diarista para auxílio em instalação doméstica de banheiros no ED Vivenda",
      imageSource:
        "https://th.bing.com/th/id/R.6b7ce0e8a5dcf64078ca7db0c4f97e77?rik=vk6odBs898iVUQ&pid=ImgRaw&r=0",
    },
    {
      id: "4",
      title: "Técnico TI",
      status: "Aberto",
      description:
        "Prestação de suporte a formatação de computadores empresariais.",
      imageSource:
        "https://th.bing.com/th/id/OIP.x7wjoKkNsXxnwlM8JX5BhgHaE8?rs=1&pid=ImgDetMain",
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
    },
    {
      id: "2",
      title: "Montador de Móveis",
      description:
        "Diarista com montagens de móveis planejados. Com ótima reputação e atendendo diversas demandas.",
      imageSource:
        "https://www.lhmontagemdemoveis.com.br/wp-content/uploads/2019/11/Montador-De-M%C3%B3veis-EM-Salvador-BA.png",
    },
    {
      id: "3",
      title: "Doméstica",
      description:
        "Diarista Doméstica. Empresa especializada há mais de 10 anos.",
      imageSource:
        "https://vejasp.abril.com.br/wp-content/uploads/2016/12/domestica_-divulgacao-desvia-3-1.jpeg?quality=70&strip=info&w=928",
    },
    {
      id: "4",
      title: "Jardinagem",
      description:
        "Manutenção de jardins, poda de árvores e plantas. Empresa destaque no ramo.",
      imageSource:
        "https://img.freepik.com/free-photo/smiling-afro-gardener-using-hedge-trimmer-cutting-bushes_651396-1479.jpg",
    },
  ];

  // Filtra os serviços populares de acordo com o texto da busca
  const filteredPopulares = mockPopulares.filter((popular) =>
    popular.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Map Container */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>Mapa - Aqui será o mapa interativo</Text>
        </View>

        {/* Destaques */}
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

        {/* Caixa de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por categoria"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* Populares */}
        <Text style={[styles.sectionTitle, styles.popularesTitle]}>
          Populares
        </Text>

        <View style={styles.popularesContainer}>
          <ScrollView nestedScrollEnabled>
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
  mainScroll: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    fontSize: 16,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  servicesContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    marginRight: 10,
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardStatus: {
    fontSize: 14,
    color: "green",
  },
  searchContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  popularesTitle: {
    marginTop: 3,
  },
  popularesContainer: {
    flex: 1,
    maxHeight: 300,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  popularCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    padding: 10,
  },
  popularImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  popularTextContainer: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  popularDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default TelaInicial;
