import React, { useEffect, useState } from 'react';
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
import { getLastPeriod, calculateGestationWeek, getBabySize, getBabyDescription } from '../../utils/gestationUtils';

const { width, height } = Dimensions.get('window');

// Mapeamento das imagens das semanas
const fetusImages: { [key: string]: any } = {
  '04': require('../../assets/images/Fetus_weeks_img/04-fetaldev-E-deeptan_4x3.jpg'),
  '05': require('../../assets/images/Fetus_weeks_img/05-fetaldev-E-deeptan_4x3.jpg'),
  '06': require('../../assets/images/Fetus_weeks_img/06-fetaldev-E-deeptan_4x3.jpg'),
  '07': require('../../assets/images/Fetus_weeks_img/07-fetaldev-E-deeptan_4x3.jpg'),
  '08': require('../../assets/images/Fetus_weeks_img/08-fetaldev-E-deeptan_4x3.jpg'),
  '09': require('../../assets/images/Fetus_weeks_img/09-fetaldev-E-deeptan_4x3.jpg'),
  '10': require('../../assets/images/Fetus_weeks_img/10-fetaldev-E-deeptan_4x3.jpg'),
  '11': require('../../assets/images/Fetus_weeks_img/11-fetaldev-E-deeptan_4x3.jpg'),
  '12': require('../../assets/images/Fetus_weeks_img/12-fetaldev-E-deeptan_4x3.jpg'),
  '13': require('../../assets/images/Fetus_weeks_img/13-fetaldev-E-deeptan_4x3.jpg'),
  '14': require('../../assets/images/Fetus_weeks_img/14-fetaldev-E-deeptan_4x3.jpg'),
  '15': require('../../assets/images/Fetus_weeks_img/15-fetaldev-E-deeptan_4x3.jpg'),
  '16': require('../../assets/images/Fetus_weeks_img/16-fetaldev-E-deeptan_4x3.jpg'),
  '17': require('../../assets/images/Fetus_weeks_img/17-fetaldev-E-deeptan_4x3.jpg'),
  '18': require('../../assets/images/Fetus_weeks_img/18-fetaldev-E-deeptan_4x3.jpg'),
  '19': require('../../assets/images/Fetus_weeks_img/19-fetaldev-E-deeptan_4x3.jpg'),
  '20': require('../../assets/images/Fetus_weeks_img/20-fetaldev-E-deeptan_4x3.jpg'),
  '21': require('../../assets/images/Fetus_weeks_img/21-fetaldev-E-deeptan_4x3.jpg'),
  '22': require('../../assets/images/Fetus_weeks_img/22-fetaldev-E-deeptan_4x3.jpg'),
  '23': require('../../assets/images/Fetus_weeks_img/23-fetaldev-E-deeptan_4x3.jpg'),
  '24': require('../../assets/images/Fetus_weeks_img/24-fetaldev-E-deeptan_4x3.jpg'),
  '25': require('../../assets/images/Fetus_weeks_img/25-fetaldev-E-deeptan_4x3.jpg'),
  '26': require('../../assets/images/Fetus_weeks_img/26-fetaldev-E-deeptan_4x3.jpg'),
  '27': require('../../assets/images/Fetus_weeks_img/27-fetaldev-E-deeptan_4x3.jpg'),
  '28': require('../../assets/images/Fetus_weeks_img/28-fetaldev-E-deeptan_4x3.jpg'),
  '29': require('../../assets/images/Fetus_weeks_img/29-fetaldev-E-deeptan_4x3.jpg'),
  '30': require('../../assets/images/Fetus_weeks_img/30-fetaldev-E-deeptan_4x3.jpg'),
  '31': require('../../assets/images/Fetus_weeks_img/31-fetaldev-E-deeptan_4x3.jpg'),
  '32': require('../../assets/images/Fetus_weeks_img/32-fetaldev-E-deeptan_4x3.jpg'),
  '33': require('../../assets/images/Fetus_weeks_img/33-fetaldev-E-deeptan_4x3.jpg'),
  '34': require('../../assets/images/Fetus_weeks_img/34-fetaldev-E-deeptan_4x3.jpg'),
  '35': require('../../assets/images/Fetus_weeks_img/35-fetaldev-E-deeptan_4x3.jpg'),
  '36': require('../../assets/images/Fetus_weeks_img/36-fetaldev-E-deeptan_4x3.jpg'),
  '37': require('../../assets/images/Fetus_weeks_img/37-fetaldev-E-deeptan_4x3.jpg'),
  '38': require('../../assets/images/Fetus_weeks_img/38-fetaldev-E-deeptan_4x3.jpg'),
  '39': require('../../assets/images/Fetus_weeks_img/39-fetaldev-E-deeptan_4x3.jpg'),
  '40': require('../../assets/images/Fetus_weeks_img/40-fetaldev-E-deeptan_4x3.jpg'),
  '41': require('../../assets/images/Fetus_weeks_img/41-fetaldev-E-deeptan_4x3.jpg'),
};

const getFetusImage = (week: number) => {
  const formattedWeek = week.toString().padStart(2, '0');
  return fetusImages[formattedWeek];
};

export default function HomeScreen() {
  const [gestationWeek, setGestationWeek] = useState(0);
  const [babySize, setBabySize] = useState('');
  const [babyDescription, setBabyDescription] = useState('');
  const nextAppointment = '15/04/2024';

  useEffect(() => {
    const loadGestationData = async () => {
      const lastPeriod = await getLastPeriod();
      if (lastPeriod) {
        console.log('Index - Data última menstruação:', lastPeriod);
        const result = calculateGestationWeek(lastPeriod);
        console.log('Index - Semana calculada:', result.weeks);
        setGestationWeek(result.weeks);
        setBabySize(getBabySize(result.weeks));
        setBabyDescription(getBabyDescription(result.weeks));
      }
    };

    loadGestationData();
  }, []);

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Minha Gestação</Text>
          <View style={styles.weekContainer}>
            <Text style={styles.weekText}>Semana {gestationWeek}</Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.mainCardTitle}>Desenvolvimento do Bebê</Text>
          <View style={styles.babyInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={getFetusImage(gestationWeek)}
                style={styles.babyImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.babyDetails}>
              <View style={styles.sizeContainer}>
                <Text style={styles.sizeLabel}>Tamanho atual:</Text>
                <Text style={styles.babySize}>{babySize}</Text>
              </View>
              <Text style={styles.babyDescription}>
                {babyDescription}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.appointmentCard}>
          <FontAwesome name="calendar" size={24} color="#20B2AA" />
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>Próxima Consulta</Text>
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
  weekContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  weekText: {
    fontSize: width * 0.05,
    color: '#20B2AA',
    fontWeight: '600',
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  mainCardTitle: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 20,
    textAlign: 'center',
  },
  babyInfo: {
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#f8f8f8',
    borderRadius: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  babyImage: {
    width: width * 0.95,
    height: width * 0.95,
    borderRadius: width * 0.325,
  },
  babyDetails: {
    width: '100%',
    alignItems: 'center',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  sizeLabel: {
    fontSize: width * 0.04,
    color: '#666',
    marginRight: 8,
  },
  babySize: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#20B2AA',
  },
  babyDescription: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  appointmentInfo: {
    marginLeft: 15,
  },
  appointmentTitle: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#20B2AA',
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
