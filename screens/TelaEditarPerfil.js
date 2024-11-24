import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import CustomButton from "../src/components/CustomButton";

const TelaEditarPerfil = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState("https://example.com/default-profile.png");

  const saveChanges = () => {
    console.log("Mudanças salvas:", { name, email, password, dob, country });
    navigation.goBack();
  };

  const chooseImage = () => {
    const options = {
      title: "Selecionar Imagem",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("Usuário cancelou a seleção de imagem");
      } else if (response.error) {
        console.log("Erro:", response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TouchableOpacity onPress={chooseImage} style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.changeImageText}>Clique para alterar a imagem</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={dob}
        onChangeText={setDob}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Salvar" onPress={saveChanges} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  profileImageWrapper: {
    backgroundColor: "#f0f0f0",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeImageText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default TelaEditarPerfil;
