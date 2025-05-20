// app/index.tsx
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      setTimeout(() => {
        router.replace('/login');
      }, 0); // garante que o layout já foi montado
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
