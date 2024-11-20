import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../src/components/NavBar'; // Importando a NavBar

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
      <ScrollView>
        {/* Mapa Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>Mapa - Aqui será o mapa interativo</Text>
        </View>

        {/* Serviços em Destaque */}
        <Text style={styles.sectionTitle}>Serviços em Destaque</Text>
        <ScrollView horizontal style={styles.servicesContainer}>
          <ServiceCard 
            title="Faz Tudo" 
            status="Aberto" 
          />
          <ServiceCard 
            title="Eletrecista" 
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

        {/* Barra de Busca */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Encontrar Serviços" 
          />
        </View>

        {/* Populares */}
        <Text style={styles.sectionTitle}>Popular</Text>
        <ScrollView style={styles.popularContainer}>
          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Serviço a 2 anos no mercado</Text>
              <Text style={styles.popularDescription}>Serviço altamente recomendado pelos clientes.</Text>
            </View>
          </View>

          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Outro Serviço Popular</Text>
              <Text style={styles.popularDescription}>Com ótima reputação e atendendo diversas demandas.</Text>
            </View>
          </View>

          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Outro Serviço Popular</Text>
              <Text style={styles.popularDescription}>Com ótima reputação e atendendo diversas demandas.</Text>
            </View>
          </View>

          <View style={styles.popularCard}>
            <Image 
              style={styles.popularImage} 
            />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularTitle}>Outro Serviço Popular</Text>
              <Text style={styles.popularDescription}>Com ótima reputação e atendendo diversas demandas.</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      
      {/* Adicionando a NavBar */}
      <NavBar activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapContainer: {
    height: 200,
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
  },
  servicesContainer: {
    flexDirection: 'row',
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
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  popularContainer: {
    marginTop: 20,
    maxHeight: 300,
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
