import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaAbertura from "./screens/TelaAbertura";
import TelaLogin from "./screens/TelaLogin";
import TelaRegisto from "./screens/TelaRegistro";
import TelaEditarPerfil from "./screens/TelaEditarPerfil";
import TelaTornarVendedor from "./screens/TelaTornarVendedor";
import TelaChatGeral from "./screens/TelaChatGeral";
import TelaChatVendedor from "./screens/TelaChatVendedor";
import Routes from "./src/NavBar";
import TelaPerfil from "./screens/TelaPerfil";
import TelaServico from "./screens/TelaServico";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Opening"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Opening" component={TelaAbertura} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Register" component={TelaRegisto} />
        <Stack.Screen name="Home" component={Routes} />
        <Stack.Screen
          name="TelaEditarPerfil"
          component={TelaEditarPerfil}
          options={{ headerShown: true, title: "Editar Perfil" }}
        />
        <Stack.Screen
          name="TelaTornarVendedor"
          component={TelaTornarVendedor}
          options={{ headerShown: true, title: "Se tornar um Vendedor" }}
        />
        <Stack.Screen name="TelaChatGeral" component={TelaChatGeral} />
        <Stack.Screen name="TelaChatVendedor" component={TelaChatVendedor} />
        <Stack.Screen name="TelaPefil" component={TelaPerfil} />
        <Stack.Screen name="TelaServico" component={TelaServico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
