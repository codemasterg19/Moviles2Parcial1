import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../config/Config';
import { ref, set } from 'firebase/database';

export default function RegistroPais() {
  const [nombre, setNombre] = useState('');
  const [capital, setCapital] = useState('');
  const [region, setRegion] = useState('');
  const [poblacion, setPoblacion] = useState('');

  // REGISTRAR
  function guardarPais(nombre: string, capital: string, region: string, poblacion: string) {
    try {
      set(ref(db, 'paises/' + nombre), {
        pais: nombre,
        cap: capital,
        reg: region,
        pob: poblacion
      });
      Alert.alert('Mensaje', 'País Ingresado');
    } catch (error) {
      console.log(error);
    }

    setNombre('');
    setCapital('');
    setRegion('');
    setPoblacion('');
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>REGISTRO DE PAIS</Text>
      <Text style={styles.label}>Nombre del País</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Capital</Text>
      <TextInput
        style={styles.input}
        value={capital}
        onChangeText={setCapital}
      />

      <Text style={styles.label}>Región</Text>
      <TextInput
        style={styles.input}
        value={region}
        onChangeText={setRegion}
      />

      <Text style={styles.label}>Población</Text>
      <TextInput
        style={styles.input}
        value={poblacion}
        onChangeText={setPoblacion}
        keyboardType="numeric"
      />

      <Button title="Registrar País" onPress={() => guardarPais(nombre, capital, region, poblacion)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
