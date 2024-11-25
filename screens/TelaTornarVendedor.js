import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";

const TelaAdicionarServico = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imgGallery, setImgGallery] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [coordenates, setCoordenates] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchUserSession = async () => {
    try {
      const { data: session, error: sessionError } = await Supabase.auth.getSession();
      if (sessionError) throw new Error("Erro ao obter sessão");
      const user = session?.session?.user;

      if (!user) throw new Error("Usuário não encontrado");
      setUserId(user.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !price || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      const imgArray = imgGallery ? imgGallery.split(",").map((img) => img.trim()) : [];
      const coordenatesArray = coordenates
        ? coordenates.split(",").map((coord) => coord.trim())
        : [];

      const { data, error } = await Supabase.from("services").insert([
        {
          id_usuario: userId,
          title,
          description,
          img_galery: imgArray,
          price: parseFloat(price),
          phone,
          coordenades: coordenatesArray,
          id_status: true, // Define o status como ativo
        },
      ]);

      if (error) throw error;

      Alert.alert("Sucesso", "Serviço adicionado com sucesso!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Adicionar Serviço</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título do serviço"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva seu serviço"
            multiline
          />

          <Text style={styles.label}>Galeria de Imagens (URLs separadas por vírgula)</Text>
          <TextInput
            style={styles.input}
            value={imgGallery}
            onChangeText={setImgGallery}
            placeholder="Ex.: http://imagem1.jpg, http://imagem2.jpg"
          />

          <Text style={styles.label}>Preço</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Digite o preço"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Digite o número de telefone"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Coordenadas (latitude,longitude)</Text>
          <TextInput
            style={styles.input}
            value={coordenates}
            onChangeText={setCoordenates}
            placeholder="Ex.: -23.5505,-46.6333"
          />

          <View style={styles.buttonContainer}>
            <CustomButton title="Adicionar Serviço" onPress={handleSubmit} />
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
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default TelaAdicionarServico;