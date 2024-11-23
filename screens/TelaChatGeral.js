import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ServicosSolicitados = () => {
  const servicos = [
    {
      id: '1',
      categoria: 'Pintor',
      detalhes: '5 Autônomos.\nPresencial.\nPintar somente uma parede.',
      prazo: 'Até 22 de Fevereiro de 2022.',
    },
    {
      id: '2',
      categoria: 'Eletricista',
      detalhes: '5 Autônomos.\nPresencial.\nInstalar o lustre na sala.',
      prazo: 'Até 22 de Fevereiro de 2022.',
    },
    {
      id: '3',
      categoria: 'Encanador',
      detalhes: '5 Autônomos.\nPresencial.\nInstalar a pia da cozinha.',
      prazo: 'Até 22 de Fevereiro de 2022.',
    },
  ];

  const renderServico = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.categoria}>{item.categoria}</Text>
      <Text style={styles.detalhes}>{item.detalhes}</Text>
      <Text style={styles.prazo}>{item.prazo}</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Falar com vendedor</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.voltar}>
          <Text style={styles.voltarTexto}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Serviços Solicitados</Text>
      </View>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderServico}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    paddingTop: 50, 
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  voltar: {
    position: 'absolute',
    top: 70,
    left: 15,
  },
  voltarTexto: {
    fontSize: 18,
    color: '#333',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, 
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  categoria: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  prazo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    height: 16,
  },
});

export default ServicosSolicitados;
