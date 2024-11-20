import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaAbertura from './screens/TelaAbertura';
import TelaLogin from './screens/TelaLogin';
import TelaRegisto from './screens/TelaRegistro';
import Routes from './src/NavBar';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opening" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Opening" component={TelaAbertura} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Register" component={TelaRegisto} />
        <Stack.Screen name="Home" component={Routes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
