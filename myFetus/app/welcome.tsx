import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { saveLastPeriod } from '../utils/gestationUtils';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (text: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = text.replace(/\D/g, '');
    
    // Aplica a máscara DD/MM/AAAA
    let formatted = '';
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      if (numbers.length > 2) {
        formatted += '/' + numbers.substring(2, 4);
        if (numbers.length > 4) {
          formatted += '/' + numbers.substring(4, 8);
        }
      }
    }
    
    return formatted;
  };

  const handleDateChange = (text: string) => {
    const formatted = formatDate(text);
    setSelectedDate(formatted);
  };

  const handleSaveLastPeriod = async (date: string) => {
    await saveLastPeriod(date);
    if (date.length === 10) {
      const [day, month, year] = date.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      console.log('Welcome - Data formatada para navegação:', formattedDate);
      router.push({
        pathname: '/gestation-info',
        params: { lastMenstruation: formattedDate }
      });
    }
  };

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <View style={styles.welcomeContent}>
            <Image
              source={require('../assets/images/myfetus-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            
            <Text style={styles.welcomeText}>
              Bem-vinda ao MyFetus!
            </Text>
            
            <Text style={styles.subtitle}>
              Seu companheiro durante toda a gestação
            </Text>

            <Image
              source={require('../assets/images/fetus-heart.png')}
              style={styles.heartImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              Qual foi a data da sua última menstruação?
            </Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/AAAA"
                value={selectedDate}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor="#f9a9a7"
              />
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  selectedDate.length !== 10 && styles.submitButtonDisabled
                ]}
                onPress={() => handleSaveLastPeriod(selectedDate)}
                disabled={selectedDate.length !== 10}
              >
                <Text style={styles.submitButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: height * 0.1,
  },
  logo: {
    width: width * 0.7,
    height: height * 0.2,
    marginBottom: height * 0.02,
  },
  welcomeText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#20B2AA',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  heartImage: {
    width: width * 0.3,
    height: width * 0.3,
    marginTop: height * 0.02,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  questionText: {
    fontSize: width * 0.05,
    color: '#20B2AA',
    textAlign: 'center',
    marginBottom: height * 0.02,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  dateInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    textAlign: 'center',
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#20B2AA',
  },
  submitButton: {
    backgroundColor: '#20B2AA',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
}); 