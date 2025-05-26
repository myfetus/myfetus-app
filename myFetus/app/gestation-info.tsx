import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function GestationInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [gestationWeeks, setGestationWeeks] = useState(0);
  
  // Animações para as ondas
  const wave1Anim = useRef(new Animated.Value(0)).current;
  const wave2Anim = useRef(new Animated.Value(0)).current;
  const wave3Anim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (params.lastMenstruation) {
      const lastMenstruation = new Date(params.lastMenstruation as string);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastMenstruation.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      setGestationWeeks(weeks);
    }
  }, [params.lastMenstruation]);

  useEffect(() => {
    const startWaveAnimation = () => {
      const createAnimation = (value: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 4000,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 4000,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: true,
            }),
          ])
        );
      };

      // Animação de rotação contínua mais suave
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 15000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        })
      ).start();

      Animated.parallel([
        createAnimation(wave1Anim, 0),
        createAnimation(wave2Anim, 1300),
        createAnimation(wave3Anim, 2600),
      ]).start();
    };

    startWaveAnimation();
  }, []);

  const handleContinue = () => {
    router.replace('/login');
  };

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const wave1Style = {
    transform: [
      {
        scale: wave1Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
      { rotate: rotation },
    ],
    opacity: wave1Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.6, 0.3],
    }),
  };

  const wave2Style = {
    transform: [
      {
        scale: wave2Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
      { rotate: rotation },
    ],
    opacity: wave2Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.6, 0.3],
    }),
  };

  const wave3Style = {
    transform: [
      {
        scale: wave3Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
      { rotate: rotation },
    ],
    opacity: wave3Anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.6, 0.3],
    }),
  };

  const createOrganicPath = (size: number) => {
    const center = size / 2;
    const radius = size * 0.4;
    const points = 8;
    let path = '';

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const nextAngle = ((i + 1) / points) * Math.PI * 2;
      
      const x1 = center + radius * Math.cos(angle);
      const y1 = center + radius * Math.sin(angle);
      const x2 = center + radius * Math.cos(nextAngle);
      const y2 = center + radius * Math.sin(nextAngle);
      
      const controlX1 = center + (radius * 1.2) * Math.cos(angle + Math.PI / points);
      const controlY1 = center + (radius * 1.2) * Math.sin(angle + Math.PI / points);
      const controlX2 = center + (radius * 1.2) * Math.cos(nextAngle - Math.PI / points);
      const controlY2 = center + (radius * 1.2) * Math.sin(nextAngle - Math.PI / points);

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      }
      path += `C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2} `;
    }

    return path;
  };

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          Parabéns!
        </Text>

        <Text style={styles.weeksText}>
          Você está na {gestationWeeks}ª semana de gestação
        </Text>

        <View style={styles.imageContainer}>
          <Animated.View style={[styles.wave, wave1Style]}>
            <Svg width={width * 0.8} height={width * 0.8}>
              <Path
                d={createOrganicPath(width * 0.8)}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.wave, wave2Style]}>
            <Svg width={width * 0.8} height={width * 0.8}>
              <Path
                d={createOrganicPath(width * 0.8)}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </Animated.View>
          <Animated.View style={[styles.wave, wave3Style]}>
            <Svg width={width * 0.8} height={width * 0.8}>
              <Path
                d={createOrganicPath(width * 0.8)}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </Animated.View>
          <Image
            source={require('../assets/images/fetus-heart.png')}
            style={styles.fetusImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.description}>
          Seu bebê está se desenvolvendo a cada dia!
        </Text>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#20B2AA',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  weeksText: {
    fontSize: width * 0.06,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.04,
    fontWeight: '500',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fetusImage: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  description: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  continueButton: {
    backgroundColor: '#20B2AA',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '500',
  },
}); 