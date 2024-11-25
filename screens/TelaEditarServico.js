import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";

const TelaEditarServico = ({ navigation, route }) => {
  const { service } = route.params;

  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price?.toString() || "");
  const [phone, setPhone] = useState(service?.phone || "");
  const [coordinates, setCoordinates] = useState(
    service?.coordenades?.join(",") || ""
  );
  const [category, setCategory] = useState(service?.category || "dia_a_dia");
  const [serviceImg, setServiceImg] = useState(service?.service_img || "");
  const [imgGallery, setImgGallery] = useState(
    service?.img_galery?.join(",") || ""
  );

  const handleSubmit = async () => {
    if (!title || !description || !price || !phone || !coordinates || !category) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const coordinatesArray = coordinates.split(",").map(coord => parseFloat(coord));
    const galleryArray = imgGallery.split(",").map(link => link.trim());

    try {
      const { error } = await Supabase.from("services")
        .update({
          title,
          description,
          price: parseFloat(price),
          phone,
          coordenades: coordinatesArray,
          category,
          service_img: serviceImg.trim(),
          img_galery: galleryArray,
        })
        .eq("id", service.id);

      if (error) throw error;
      Alert.alert("Sucesso", "Serviço atualizado com sucesso!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", err.message);
    }

    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Título */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título do serviço"
        />

        {/* Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva seu serviço"
          multiline
        />

        {/* Preço */}
        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Digite o preço"
          keyboardType="numeric"
        />

        {/* Telefone */}
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Digite o número de telefone"
          keyboardType="phone-pad"
        />

        {/* Imagem de Capa */}
        <Text style={styles.label}>Imagem de Capa (Link)</Text>
        <TextInput
          style={styles.input}
          value={serviceImg}
          onChangeText={setServiceImg}
          placeholder="Cole o link da imagem de capa"
        />

        {/* Galeria de Imagens */}
        <Text style={styles.label}>
          Galeria de Imagens (Links separados por vírgulas)
        </Text>
        <TextInput
          style={styles.input}
          value={imgGallery}
          onChangeText={setImgGallery}
          placeholder="Cole os links das imagens, separados por vírgula"
          multiline
        />
        
        {/* Categoria */}
        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Dia a dia" value="dia_a_dia" />
          <Picker.Item label="Manutenção" value="manutencao" />
          <Picker.Item label="Tecnologia" value="tecnologia" />
          <Picker.Item label="Mão de obra" value="mao_de_obra" />
          <Picker.Item label="Jardinagem" value="jardinagem" />
        </Picker>

        {/* Endereço - Coordenadas */}
        <Text style={styles.label}>Endereço</Text>
        <GooglePlacesAutocomplete
          placeholder="Pesquise um endereço"
          onPress={(data, details = null) => {
            const { lat, lng } = details.geometry.location;
            setCoordinates(`${lat},${lng}`);
          }}
          fetchDetails
          query={{
            key: "AIzaSyDKy-9pgFnme2fBWP63ebe8Y2AnD3_fQM4",
            language: "pt-BR",
          }}
          styles={{
            textInput: styles.input,
            container: { marginBottom: 15 },
          }}
        />

        {/* Botão de Salvar */}
        <View style={styles.buttonContainer}>
          <CustomButton title="Salvar Alterações" onPress={handleSubmit} />
        </View>
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
    marginTop: 70,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
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
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default TelaEditarServico;