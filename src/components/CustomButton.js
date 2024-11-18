import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function CustomButton(props) {
  return React.createElement(
    TouchableOpacity,
    {
      style: [styles.button, props.style],
      onPress: props.onPress,
    },
    React.createElement(Text, { style: styles.text }, props.title)
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005BB5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;