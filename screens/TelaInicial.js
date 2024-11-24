import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ServiceCard({ title, imageSource, status }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardStatus}>{status}</Text>
    </TouchableOpacity>
  );
}

function TelaInicial() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Scroll principal */}
      <ScrollView style={styles.mainScroll} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Mapa */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>Mapa - Aqui será o mapa interativo</Text>
        </View>

        {/* Serviços em Destaque */}
        <Text style={styles.sectionTitle}>Serviços em Destaque</Text>
        <ScrollView horizontal style={styles.servicesContainer}>
          <ServiceCard
            title="Mecânico"
            status="Aberto"
            imageSource="https://cocupo.com/wp-content/uploads/2016/05/que-es-un-mecanico.jpg"
          />
          <ServiceCard
            title="Eletricista"
            status="Aberto"
            imageSource="https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg"
          />
          <ServiceCard
            title="Encanador"
            status="Aberto"
            imageSource="https://th.bing.com/th/id/R.6b7ce0e8a5dcf64078ca7db0c4f97e77?rik=vk6odBs898iVUQ&pid=ImgRaw&r=0"
          />
          <ServiceCard
            title="Técnico TI"
            status="Aberto"
            imageSource="https://th.bing.com/th/id/OIP.x7wjoKkNsXxnwlM8JX5BhgHaE8?rs=1&pid=ImgDetMain"
          />
        </ScrollView>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Encontrar Serviços" />
        </View>

        {/* Populares */}
        <Text style={[styles.sectionTitle, styles.popularesTitle]}>Populares</Text>

        {/* Scroll da seção Populares */}
        <View style={styles.popularesContainer}>
          <ScrollView nestedScrollEnabled style={styles.popularScroll} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.popularCard}>
              <Image style={styles.popularImage} source={{ uri: 'https://guia.ar/wp-content/uploads/2021/02/servise-image-5.jpg' }} />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularTitle}>Pintor Residencial</Text>
                <Text style={styles.popularDescription}>Pintura de paredes internas e externas.
                  Serviço altamente recomendado pelos clientes.</Text>
              </View>
            </View>

            <View style={styles.popularCard}>
              <Image style={styles.popularImage} source={{ uri: 'https://www.lhmontagemdemoveis.com.br/wp-content/uploads/2019/11/Montador-De-M%C3%B3veis-EM-Salvador-BA.png' }} />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularTitle}>Montador de móveis</Text>
                <Text style={styles.popularDescription}>Diarista com montagens de móveis planejados.
                  Com ótima reputação e atendendo diversas demandas.</Text>
              </View>
            </View>

            <View style={styles.popularCard}>
              <Image style={styles.popularImage} source={{ uri: 'https://vejasp.abril.com.br/wp-content/uploads/2016/12/domestica_-divulgacao-desvia-3-1.jpeg?quality=70&strip=info&w=928' }} />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularTitle}>Doméstica</Text>
                <Text style={styles.popularDescription}>Diarista Doméstica.
                  Empresa especializada a mais de 1o anos.</Text>
              </View>
            </View>

            <View style={styles.popularCard}>
              <Image style={styles.popularImage} source={{ uri: 'https://img.freepik.com/free-photo/smiling-afro-gardener-using-hedge-trimmer-cutting-bushes_651396-1479.jpg' }} />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularTitle}>Jardinagem</Text>
                <Text style={styles.popularDescription}>Manutenção de jardins, poda de árvores e plantas.
                  Empresa destaque no ramo.
                </Text>
              </View>
            </View>

            <View style={styles.popularCard}>
              <Image style={styles.popularImage} source={{ uri: 'https://weremote.net/wp-content/uploads/2022/07/paletas-colores-ordenador-escritorio.jpg' }} />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularTitle}>Design Gráfico</Text>
                <Text style={styles.popularDescription}>Criação de logotipos e catálogos. 
                  Empresa situada no mercado de Marketing.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainScroll: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    marginRight: 10,
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStatus: {
    fontSize: 14,
    color: 'green',
  },
  searchContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  popularesTitle: {
    marginTop: 3,
  },
  popularesContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  popularScroll: {
    maxHeight: 250, 
  },
  popularCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F4F4F4',
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
    justifyContent: 'center',
    flex: 1,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popularDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default TelaInicial;
