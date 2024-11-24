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
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [availability, setAvailability] = useState("");

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
          <Text style={styles.title}>Tornar-se um Vendedor</Text>

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

          <Text style={styles.label}>Certificações</Text>
          <TextInput
            style={styles.input}
            value={certifications}
            onChangeText={setCertifications}
            placeholder="Ex.: Certificação Google Ads, UX Design"
          />

          <Text style={styles.label}>Idiomas que Domina</Text>
          <TextInput
            style={styles.input}
            value={languages}
            onChangeText={setLanguages}
            placeholder="Ex.: Português, Inglês, Espanhol"
          />

          <Text style={styles.label}>Faixa de Preço</Text>
          <TextInput
            style={styles.input}
            value={priceRange}
            onChangeText={setPriceRange}
            placeholder="Ex.: A partir de R$500"
          />

          <Text style={styles.label}>Disponibilidade</Text>
          <TextInput
            style={styles.input}
            value={availability}
            onChangeText={setAvailability}
            placeholder="Ex.: Segunda a Sexta, das 9h às 18h"
          />

          <View style={styles.buttonContainer}>
            <CustomButton title="Enviar para Avaliação" onPress={handleSubmit} />
          </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    fontSize: 16, // Ajustado para consistência com a tela EditarPerfil
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default TelaTornarVendedor;
