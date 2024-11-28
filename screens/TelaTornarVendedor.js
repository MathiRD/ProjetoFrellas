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
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importação do Picker
import * as Location from "expo-location";
import CustomButton from "../src/components/CustomButton";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Supabase from "../src/SupabaseClient";
import 'react-native-get-random-values';
import { GOOGLE_MAPS_KEY } from '@env';
console.log(GOOGLE_MAPS_KEY);


const TelaAdicionarServico = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [category, setCategory] = useState("dia a dia"); // Categoria inicial
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const { data: session, error: sessionError } = await Supabase.auth.getSession();
        if (sessionError) throw new Error("Erro ao obter sessão");
        const user = session?.session?.user;
        if (!user) throw new Error("Usuário não encontrado");
        setUserId(user.id);
      } catch (err) {
        Alert.alert("Erro", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão de localização negada");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
    } catch (err) {
      Alert.alert("Erro ao obter localização", err.message);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !phone || !coordinates || !category) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const coordinatesArray = coordinates.split(",").map(coord => parseFloat(coord));

    try {
      setLoading(true);
      const { data, error } = await Supabase.from("services").insert([
        {
          id_usuario: userId,
          title,
          description,
          price: parseFloat(price),
          phone,
          coordenades: coordinatesArray,
          id_status: true,
          category, // Adicionando categoria ao registro
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

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

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={region}
              onPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setCoordinates(`${latitude},${longitude}`);
                setRegion((prev) => ({
                  ...prev,
                  latitude,
                  longitude,
                }));
              }}
            >
              {coordinates && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(coordinates.split(",")[0]),
                    longitude: parseFloat(coordinates.split(",")[1]),
                  }}
                />
              )}
            </MapView>

            <GooglePlacesAutocomplete
              placeholder="Pesquise um endereço"
              onPress={(data, details = null) => {
                const { lat, lng } = details.geometry.location;
                setCoordinates(`${lat},${lng}`);
                setRegion((prev) => ({
                  ...prev,
                  latitude: lat,
                  longitude: lng,
                }));
              }}
              fetchDetails
              query={{
                key: GOOGLE_MAPS_KEY,
                language: "pt-BR",
              }}
              styles={{
                textInput: styles.input,
                container: styles.autocompleteContainer,
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton title="Adicionar Serviço" onPress={handleSubmit} />
          </View>
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
  mapContainer: {
    position: "relative",
    marginTop: 5,
  },
  map: {
    height: 260,
    width: "100%",
  },
  autocompleteContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default TelaAdicionarServico;