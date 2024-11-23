import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaAbertura from "./screens/TelaAbertura";
import TelaLogin from "./screens/TelaLogin";
import TelaRegisto from "./screens/TelaRegistro";
import TelaEditarPerfil from "./screens/TelaEditarPerfil";
import TelaTornarVendedor from "./screens/TelaTornarVendedor";
import Routes from "./src/NavBar"; // Sua NavBar
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Opening"
        screenOptions={{ headerShown: false }}
      >
        {/* Telas principais */}
        <Stack.Screen name="Opening" component={TelaAbertura} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Register" component={TelaRegisto} />
        <Stack.Screen name="Home" component={Routes} />

        {/* Telas adicionais */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
