// src/BecomeSellerScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../src/components/CustomButton";

const TelaTornarVendedor = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = () => {
    console.log("Dados do vendedor enviados!");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Se tornar um Vendedor</Text>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva seu trabalho"
            multiline
          />

          <Text style={styles.label}>Especialização</Text>
          <TextInput
            style={styles.input}
            value={specialization}
            onChangeText={setSpecialization}
            placeholder="Sua área de especialização"
          />

          <Text style={styles.label}>Link para Portfólio</Text>
          <TextInput
            style={styles.input}
            value={portfolioLink}
            onChangeText={setPortfolioLink}
            placeholder="Link para seu portfólio (opcional)"
            keyboardType="url"
          />

          <Text style={styles.label}>Experiência Profissional</Text>
          <TextInput
            style={styles.input}
            value={experience}
            onChangeText={setExperience}
            placeholder="Ex.: 5 anos como designer"
          />

          <CustomButton title="Enviar para Avaliação" onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1, // Ajuste para garantir que o conteúdo ocupe todo o espaço
    paddingHorizontal: 20,
    paddingTop: 50, // Ajustei para um valor mais alto e removi o paddingTop anterior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20, // Mantém o título com boa distância do topo
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
});

export default TelaTornarVendedor;
