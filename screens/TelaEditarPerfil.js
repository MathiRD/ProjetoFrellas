import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import CustomButton from "../src/components/CustomButton";
import Supabase from "../src/SupabaseClient";
import DateTimePicker from '@react-native-community/datetimepicker';

const TelaEditarPerfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isBannerModal, setIsBannerModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg";
  const defaultBannerUrl = "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75";

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
            .select("id, full_name, avatar_url, banner_url, birthday, country, city, uf")
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
            setCity(profileData.city || "");
            setUf(profileData.uf || "");
            setProfileImage(profileData.avatar_url || defaultImageUrl);
            setBannerImage(profileData.banner_url || defaultBannerUrl);
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

  const saveImageUrl = async (url, isBanner = false) => {
    try {
      const field = isBanner ? "banner_url" : "avatar_url";

      const { error } = await Supabase
        .from("profiles")
        .update({ [field]: url })
        .eq("id", userData.id);

      if (error) {
        setError("Erro ao atualizar imagem.");
      }
    } catch (err) {
      setError("Erro ao salvar a URL da imagem.");
    }
  };

  const openModal = (isBanner = false) => {
    setIsBannerModal(isBanner);
    setModalVisible(true);
  };

  const handleLinkSubmit = () => {
    if (imageUrl) {
      if (isBannerModal) {
        setBannerImage(imageUrl);
        saveImageUrl(imageUrl, true);
      } else {
        setProfileImage(imageUrl);
        saveImageUrl(imageUrl);
      }
      setModalVisible(false);
      setImageUrl("");
    } else {
      setError("Link inválido");
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(""); 

    try {
      const { data, error } = await Supabase
        .from("profiles")
        .update({ full_name: name, birthday, country, city, uf })
        .eq("id", userData.id);

      if (error) {
        setError(`Erro ao atualizar perfil: ${error.message}`);
      } else {
        setSuccessMessage("Perfil atualizado com sucesso!");
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Salvando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => openModal(true)} style={styles.bannerContainer}>
          <Image source={{ uri: bannerImage || defaultBannerUrl }} style={styles.bannerImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openModal(false)} style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image source={{ uri: profileImage || defaultImageUrl }} style={styles.profileImage} />
          </View>
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={false}
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
            onChange={(event, date) => setBirthday(date || birthday)}
          />
        )}

        <TextInput style={styles.input} placeholder="País" value={country} onChangeText={setCountry} />
        <TextInput style={styles.input} placeholder="Cidade" value={city} onChangeText={setCity} />
        <TextInput style={styles.input} placeholder="UF" value={uf} onChangeText={setUf} />

        <View style={styles.buttonContainer}>
          <CustomButton title="Salvar" onPress={saveChanges} />
        </View>

        {successMessage && (
          <View style={styles.successContainer}>
            <Text style={styles.successMessage}>{successMessage}</Text>
          </View>
        )}

        <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  bannerContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  successContainer: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 20,
  },
  successMessage: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  }
});

export default TelaEditarPerfil;