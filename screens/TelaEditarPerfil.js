import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Button, Platform } from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";
import DateTimePicker from '@react-native-community/datetimepicker';

const TelaEditarPerfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: session, error: sessionError } = await Supabase.auth.getSession();
        if (sessionError) {
          setError(`Erro ao obter sessão: ${sessionError.message}`);
          return;
        }

        const user = session?.session?.user;

        if (user) {
          const userId = user.id;

          const { data: profileData, error: profileError } = await Supabase
            .from("profiles")
            .select("id, full_name, avatar_url, birthday")
            .eq("id", userId)
            .single();

          if (profileError) {
            setError(`Erro ao carregar dados do perfil: ${profileError.message}`);
          } else {
            setUserData(user);
            setName(profileData.full_name || "");
            setEmail(user.email || "");
            setBirthday(new Date(profileData.birthday) || new Date());
            setCountry(profileData.country || "");
            setProfileImage(profileData.avatar_url || defaultImageUrl);
          }
        } else {
          setError("Sessão ou usuário não encontrados.");
        }
      } catch (err) {
        setError(`Erro ao carregar os dados do usuário: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const saveImageUrl = async (url) => {
    try {
      const { data, error } = await Supabase
        .from("profiles")
        .update({ avatar_url: url })
        .eq("id", userData.id);

      if (error) {
        setError("Erro ao atualizar imagem de perfil.");
      }
    } catch (err) {
      setError("Erro ao salvar a URL da imagem.");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleLinkSubmit = () => {
    if (imageUrl) {
      setProfileImage(imageUrl);
      saveImageUrl(imageUrl);
      setModalVisible(false);
      setImageUrl("");
    } else {
      setError("Link inválido");
    }
  };

  const saveChanges = async () => {
    try {
      const { data, error } = await Supabase
        .from("profiles")
        .update({ full_name: name, birthday, country })
        .eq("id", userData.id);

      if (error) {
        setError(`Erro ao atualizar perfil: ${error.message}`);
      }

      if (newEmail && newEmail !== email) {
        const { error: emailError } = await Supabase.auth.updateUser({
          email: newEmail,
        });

        if (emailError) {
          setError(`Erro ao atualizar e-mail: ${emailError.message}`);
        }
      }

      if (password) {
        const { error: passwordError } = await Supabase.auth.updateUser({
          password: password,
        });

        if (passwordError) {
          setError(`Erro ao atualizar senha: ${passwordError.message}`);
        }
      }
    } catch (err) {
      setError("Erro ao salvar alterações.");
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setBirthday(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <TouchableOpacity onPress={openModal} style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: profileImage || defaultImageUrl }}
            style={styles.profileImage}
          />
        </View>
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
        editable={false}  // Impede alteração direta do e-mail
      />

      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.dateText}>Data de Nascimento: {birthday.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Salvar" onPress={saveChanges} />
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Insira o link da imagem</Text>
            <TextInput
              style={styles.input}
              placeholder="Cole o link da imagem"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button title="Confirmar" onPress={handleLinkSubmit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  dateText: {
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 14,
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
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});

export default TelaEditarPerfil;