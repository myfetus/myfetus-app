import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function ChecklistScreen() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, title: 'Fazer pré-natal', completed: false },
    { id: 2, title: 'Tomar ácido fólico', completed: false },
    { id: 3, title: 'Fazer exercícios leves', completed: false },
    { id: 4, title: 'Dormir bem', completed: false },
    { id: 5, title: 'Alimentação saudável', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Checklist da Gestação</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => toggleItem(item.id)}
          >
            <View style={styles.checkbox}>
              {item.completed && (
                <FontAwesome name="check" size={16} color="#fff" />
              )}
            </View>
            <Text
              style={[
                styles.itemText,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {items.filter(item => item.completed).length} de {items.length} tarefas concluídas
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              {
                width: `${(items.filter(item => item.completed).length / items.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#20B2AA',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20B2AA',
  },
  itemText: {
    fontSize: width * 0.04,
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  progressText: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },
}); 