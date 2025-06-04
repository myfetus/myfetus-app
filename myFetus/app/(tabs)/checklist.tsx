import React, { useState, useEffect } from 'react';
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
import { calculateGestationWeek } from '../utils/gestationWeekCalculator';
import { getChecklistForWeek, ChecklistItem } from '../data/checklistData';

const { width, height } = Dimensions.get('window');

export default function ChecklistScreen() {
  // Exemplo de data da última menstruação (você deve pegar isso do estado global ou API)
  const lastMenstruation = new Date('2025-03-01');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const week = calculateGestationWeek(lastMenstruation);
    setCurrentWeek(week);
    const weekChecklist = getChecklistForWeek(week);
    if (weekChecklist) {
      setChecklistItems(weekChecklist.items.map(item => ({ ...item, completed: false })));
    }
  }, [lastMenstruation]);

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'exam':
        return 'hospital-o';
      case 'consultation':
        return 'stethoscope';
      case 'test':
        return 'flask';
      case 'monitoring':
        return 'heartbeat';
      default:
        return 'check-circle';
    }
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercentage = checklistItems.length > 0 
    ? (completedCount / checklistItems.length) * 100 
    : 0;

  return (
    <LinearGradient
      colors={['#cce5f6', '#f8cde9']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Checklist da Semana {currentWeek}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {checklistItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => toggleItem(item.id)}
          >
            <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
              {item.completed && (
                <FontAwesome name="check" size={12} color="#fff" />
              )}
            </View>
            <View style={styles.itemContent}>
              <View style={styles.itemHeader}>
                <FontAwesome 
                  name={getIconForType(item.type)} 
                  size={16} 
                  color="#20B2AA" 
                  style={styles.itemIcon}
                />
                <Text
                  style={[
                    styles.itemTitle,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              {item.description && (
                <Text
                  style={[
                    styles.itemDescription,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {completedCount} de {checklistItems.length} tarefas concluídas
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${progressPercentage}%` }
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
    paddingTop: height * 0.06,
    paddingBottom: height * 0.02,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#20B2AA',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#20B2AA',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#20B2AA',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemIcon: {
    marginRight: 8,
  },
  itemTitle: {
    fontSize: width * 0.035,
    color: '#333',
    flex: 1,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: width * 0.03,
    color: '#666',
    marginLeft: 24,
    lineHeight: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  progressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  progressText: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    height: '100%',
    backgroundColor: '#20B2AA',
    borderRadius: 4,
  },
}); 