import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue } from 'firebase/database';

export default function Screen2() {
  const [id, setId] = useState('');
  const [registros, setRegistros] = useState([]);
  const [campo, setCampo] = useState('pais'); // Campo a mostrar en la lista

  const leer = () => {
    const starCountRef = ref(db, 'paises/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrosArray: any = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRegistros(registrosArray);
      }
    });
  };

  useEffect(() => {
    leer();
  }, []);

  const buscarRegistro = () => {
    const registroRef = ref(db, 'paises/' + id);
    onValue(registroRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        mostrarAlerta(data); // Mostrar el Alert con toda la información
      } else {
        Alert.alert('Error', 'No se encontró el registro');
      }
    });
  };

  const mostrarAlerta = (data: any) => {
    Alert.alert('Información del País', `Nombre: ${data.pais}\nCapital: ${data.cap}\nRegión: ${data.reg}\nPoblación: ${data.pob}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Registro por ID</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="Ingrese ID"
      />
      <Button title="Buscar" onPress={buscarRegistro} />

      <Text style={styles.title}>Lista de Registros</Text>
      <FlatList
        data={registros}
       
        renderItem={({ item }) => (
          <Text style={styles.item} onPress={() => mostrarAlerta(item)}>
            {item[campo]}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
   // marginBottom: 20,
    marginTop:50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
