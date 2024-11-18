import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function CustomButton(props) {
  return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden', // Adicionado para garantir que o gradiente respeite os cantos arredondados
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '100%', // Adicionado para garantir que o gradiente preencha o botão
    height: '100%', // Adicionado para garantir que o gradiente preencha o botão
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CustomButton;