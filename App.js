import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

export default function App() {
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Doğum tarihi biçimini ve geçerliliğini kontrol eden fonksiyon
  const isValidDate = (dateString) => {
    // YYYY-MM-DD veya DD.MM.YYYY gibi girilen tarihlerin geçerliliğini doğrular
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
  };

  const handleAddPet = () => {
    if (!petName.trim() || !petType.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen evcil hayvanınızın adını ve türünü girin.');
      return;
    }

    // Doğum tarihi girildiyse doğruluk kontrolü yapılır (Örn: YYYY-AA-GG)
    if (birthDate.trim() && !isValidDate(birthDate.trim())) {
      Alert.alert(
        'Tarih Formatı Hatalı',
        'Lütfen doğum tarihini YYYY-AA-GG formatında girin (Örn: 2023-05-12).'
      );
      return;
    }

    const newPet = {
      id: Date.now().toString(),
      name: petName.trim(),
      type: petType.trim(),
      birthDate: birthDate.trim() || 'Belirtilmedi',
    };

    setPets([...pets, newPet]);
    setPetName('');
    setPetType('');
    setBirthDate('');
  };

  const renderPetItem = ({ item }) => (
    <View style={styles.petCard}>
      <Text style={styles.petName}>🐾 {item.name}</Text>
      <Text style={styles.petDetails}>Tür: {item.type}</Text>
      <Text style={styles.petDetails}>Doğum Tarihi: {item.birthDate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>🐾 Pati İzi</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Evcil Hayvan Adı (Örn: Gümüş)"
          value={petName}
          onChangeText={setPetName}
        />
        <TextInput
          style={styles.input}
          placeholder="Türü (Örn: Kedi, Köpek)"
          value={petType}
          onChangeText={setPetType}
        />
        <TextInput
          style={styles.input}
          placeholder="Doğum Tarihi (YYYY-AA-GG)"
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
          <Text style={styles.addButtonText}>Evcil Hayvan Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPetItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz eklenmiş bir pati yok.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#4A90E2',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  emptyText: {
    textAlign: 'center',
    color: '#95A5A6',
    marginTop: 20,
  },
});
