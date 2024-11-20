import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; // Biblioteca de ícones

function NavBar({ activeTab }) {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaInicial')} 
        style={styles.navItem}
      >
        <FontAwesome5 
          name="home" 
          size={24} 
          color={activeTab === 'home' ? '#3498db' : '#7f8c8d'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaFinanceiro')} 
        style={styles.navItem}
      >
        <FontAwesome5 
          name="wallet" 
          size={24} 
          color={activeTab === 'financeiro' ? '#3498db' : '#7f8c8d'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaChatGeral')} 
        style={styles.navItem}
      >
        <FontAwesome5 
          name="comment-alt" 
          size={24} 
          color={activeTab === 'chat' ? '#3498db' : '#7f8c8d'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaFavoritos')} 
        style={styles.navItem}
      >
        <FontAwesome5 
          name="heart" 
          size={24} 
          color={activeTab === 'favoritos' ? '#e74c3c' : '#7f8c8d'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('TelaPerfil')} 
        style={styles.navItem}
      >
        <FontAwesome5 
          name="user" 
          size={24} 
          color={activeTab === 'perfil' ? '#3498db' : '#7f8c8d'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default NavBar;
