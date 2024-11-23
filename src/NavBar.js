import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import TelaInicial from '../screens/TelaInicial'; 
import TelaFinanceiro from '../screens/TelaFinanceiro';
import TelaChatGeral from '../screens/TelaChatGeral';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home';
          else if (route.name === 'Financeiro') iconName = 'wallet';
          else if (route.name === 'Chat') iconName = 'comments';

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#7f8c8d',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Financeiro" component={TelaFinanceiro} />
      <Tab.Screen name="Chat" component={TelaChatGeral} />

    </Tab.Navigator>
  );
}
