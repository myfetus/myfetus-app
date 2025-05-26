// app/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // Dados de exemplo - em um app real, estes dados viriam de um estado global ou API
  const gestationWeek = 12;
  const babySize = 'Limão';
  const nextAppointment = '15/04/2024';

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Minha Gestação</Text>
          <Text style={styles.weekText}>Semana {gestationWeek}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Desenvolvimento do Bebê</Text>
          <View style={styles.babyInfo}>
            <Image
              source={require('../assets/images/fetus-heart.png')}
              style={styles.babyImage}
              resizeMode="contain"
            />
            <View style={styles.babyDetails}>
              <Text style={styles.babySize}>Tamanho: {babySize}</Text>
              <Text style={styles.babyDescription}>
                Seu bebê está se desenvolvendo rapidamente! Nesta fase, todos os órgãos principais já estão formados.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Próxima Consulta</Text>
          <View style={styles.appointmentInfo}>
            <FontAwesome name="calendar" size={24} color="#20B2AA" />
            <Text style={styles.appointmentDate}>{nextAppointment}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dicas da Semana</Text>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipText}>• Mantenha-se hidratada</Text>
            <Text style={styles.tipText}>• Faça exercícios leves</Text>
            <Text style={styles.tipText}>• Descanse quando necessário</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#20B2AA',
  },
  weekText: {
    fontSize: width * 0.05,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 15,
  },
  babyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  babyImage: {
    width: width * 0.2,
    height: width * 0.2,
    marginRight: 15,
  },
  babyDetails: {
    flex: 1,
  },
  babySize: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  babyDescription: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: 20,
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDate: {
    fontSize: width * 0.04,
    color: '#333',
    marginLeft: 10,
  },
  tipsContainer: {
    marginTop: 5,
  },
  tipText: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
