import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ServiceCard({ title, imageSource, status }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardStatus}>{status}</Text>
    </TouchableOpacity>
  );
}

function TelaInicial() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Conteúdo principal */}
      <ScrollView>
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>Mapa - Aqui será o mapa interativo</Text>
        </View>

        <Text style={styles.sectionTitle}>Serviços em Destaque</Text>
        <ScrollView horizontal style={styles.servicesContainer}>
          <ServiceCard 
            title="Faz Tudo" 
            status="Aberto" 
          />
          <ServiceCard 
            title="Eletricista" 
            status="Aberto" 
          />
          <ServiceCard 
            title="Encanador" 
            status="Aberto" 
          />
          <ServiceCard 
            title="Mecânico" 
            status="Aberto" 
          />
        </ScrollView>

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Encontrar Serviços" 
            
          />
        </View>
      </ScrollView>

      {/* Seção Populares com scroll vertical independente */}
      <View style={styles.popularesContainer}>
        <Text style={styles.sectionTitle}>Populares</Text>
        <ScrollView style={styles.popularScroll}>
          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
              source={{ uri: 'https://via.placeholder.com/120' }} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Serviço a 2 anos no mercado</Text>
              <Text style={styles.popularDescription}>Serviço altamente recomendado pelos clientes.</Text>
            </View>
          </View>

          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
              source={{ uri: 'https://via.placeholder.com/120' }} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Outro Serviço Popular</Text>
              <Text style={styles.popularDescription}>Com ótima reputação e atendendo diversas demandas.</Text>
            </View>
          </View>

          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
              source={{ uri: 'https://via.placeholder.com/120' }} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Outro Serviço Popular</Text>
              <Text style={styles.popularDescription}>Com ótima reputação e atendendo diversas demandas.</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapContainer: {
    height: 400,
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
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
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
    paddingTop: 1,
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
