import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../src/components/CustomButton';
import Supabase from '../src/SupabaseClient';
import { useFocusEffect } from '@react-navigation/native';

const TelaPerfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultImageUrl = 'https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg';
  const defaultBannerUrl = 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75';

  const fetchData = async () => {
    try {
      const { data: session, error: sessionError } = await Supabase.auth.getSession();

      if (sessionError) {
        setError('Erro ao obter sessão');
        return;
      }

      const user = session?.session?.user;

      if (user) {
        const userId = user.id;

        // Buscar dados do perfil do usuário
        const { data: userProfile, error: userProfileError } = await Supabase.from('profiles')
          .select('id, username, full_name, avatar_url, banner_url, country, city, uf')
          .eq('id', userId)
          .single();

        if (userProfileError) {
          throw new Error('Erro ao buscar dados do perfil');
        }

        setUserData(userProfile);
        setProfileImage(userProfile.avatar_url || defaultImageUrl);
        setBannerImage(userProfile.banner_url || defaultBannerUrl);

        // Buscar serviços do usuário
        const { data: userServices, error: servicesError } = await Supabase.from('services')
          .select('id, id_usuario, title, description, service_img, price, id_status, phone, coordenades, category')
          .eq('id_usuario', userId);

        if (servicesError) {
          throw new Error('Erro ao buscar serviços');
        }

        setServices(userServices || []);
      } else {
        throw new Error('Sessão ou usuário não encontrados');
      }
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDeleteService = async (serviceId) => {
    try {
      const { error } = await Supabase.from('services').delete().eq('id', serviceId);

      if (error) {
        throw new Error('Erro ao excluir o serviço');
      }

      Alert.alert('Sucesso', 'Serviço excluído com sucesso!');
      setServices((prev) => prev.filter((service) => service.id !== serviceId));
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const handleEditService = (service) => {
    // Passando a função de atualização para a tela de edição
    navigation.navigate('TelaEditarServico', {
      service,
      onUpdate: (updatedService) => {
        // Atualiza o serviço editado na lista de serviços
        setServices((prevServices) =>
          prevServices.map((s) => (s.id === updatedService.id ? updatedService : s))
        );
      }
    });
  };

  const handleAddService = () => {
    navigation.navigate('TelaAdicionarServico', {
      onServiceAdded: () => {
        fetchData(); // Atualiza os serviços após adicionar um novo
      }
    });
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {userData && (
        <View style={styles.profileContainer}>
          <View style={styles.coverImageContainer}>
            <Image source={{ uri: bannerImage }} style={styles.coverImage} />
          </View>

          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: profileImage || defaultImageUrl,
              }}
              style={styles.profileImage}
            />
          </View>

          <Text style={styles.userName}>{userData.username}</Text>
          <Text style={styles.location}>
            {userData.city || "Cidade"}, {userData.uf || "UF"}
          </Text>

          <CustomButton
            title="Editar Perfil"
            onPress={() => navigation.navigate("TelaEditarPerfil")}
          />
          <CustomButton
            title="Se tornar um vendedor"
            onPress={() => navigation.navigate("TelaTornarVendedor")}
          />
        </View>
      )}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Meus Serviços</Text>

      <ScrollView horizontal={true} style={styles.servicesScroll}>
        {services.length > 0 ? (
          services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() =>
                Alert.alert(
                  "Ações do Serviço",
                  "Escolha uma ação para este serviço",
                  [
                    {
                      text: "Editar",
                      onPress: () => handleEditService(service),
                    },
                    {
                      text: "Excluir",
                      onPress: () =>
                        Alert.alert(
                          "Confirmação",
                          "Tem certeza que deseja excluir este serviço?",
                          [
                            { text: "Cancelar", style: "cancel" },
                            {
                              text: "Excluir",
                              style: "destructive",
                              onPress: () => handleDeleteService(service.id),
                            },
                          ]
                        ),
                    },
                    { text: "Cancelar", style: "cancel" },
                  ]
                )
              }
            >
              <Image
                source={
                  service.service_img
                    ? { uri: service.service_img }
                    : { uri: defaultImageUrl }
                }
                style={styles.serviceImage}
              />
              <Text style={styles.serviceDescription}>
                {service.title || "Sem título"}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noServicesText}>
            Você ainda não adicionou nenhum serviço.
          </Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  noServicesText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverImageContainer: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: 200,
    marginBottom: 20,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileImageContainer: {
    backgroundColor: "#f0f0f0",
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -70,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
    width: "100%",
  },
  servicesScroll: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 180,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 5,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default TelaPerfil;
