import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { db } from '../config/Config';
import { ref, onValue, update, remove } from 'firebase/database';

export default function UsuarioScreen() {
  const [nombre, setNombre] = useState("");
  const [capital, setCapital] = useState("");
  const [region, setRegion] = useState("");
  const [poblacion, setPoblacion] = useState("");

  const [registros, setRegistros] = useState([]);
  const [visible, setVisible] = useState(false);
  const [idEditar, setIdEditar] = useState('');

  // Función para leer los países
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

  // Función para cargar datos del país seleccionado para editar
  const editarPais = (item: any) => {
    setIdEditar(item.id);
    setNombre(item.pais);
    setCapital(item.cap);
    setRegion(item.reg);
    setPoblacion(item.pob);
    setVisible(true);
  };

  // Función para guardar los cambios al editar un país
  const guardarEdicion = () => {
    update(ref(db, `paises/${idEditar}`), {
      pais: nombre,
      cap: capital,
      reg: region,
      pob: poblacion,
    })
      .then(() => {
        Alert.alert('Mensaje', 'País editado exitosamente');
        setVisible(false);
        leer(); // Actualizar la lista después de editar
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Función para eliminar un país
  const eliminarPais = (id: any) => {
    remove(ref(db, `paises/${id}`))
      .then(() => {
        Alert.alert('Mensaje', 'País eliminado exitosamente');
        leer(); // Actualizar la lista después de eliminar
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDITAR/ELIMINAR</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del País"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Capital"
        value={capital}
        onChangeText={setCapital}
      />

      <TextInput
        style={styles.input}
        placeholder="Región"
        value={region}
        onChangeText={setRegion}
      />

      <TextInput
        style={styles.input}
        placeholder="Población"
        value={poblacion}
        onChangeText={setPoblacion}
        keyboardType="numeric"
      />

      {visible && (
        <View style={styles.buttonContainer}>
          <Button title="Guardar Edición" onPress={guardarEdicion} />
        </View>
      )}

      <FlatList
        data={registros}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text>{item.pais}</Text>
            <Text>{item.cap}</Text>
            <Text>{item.reg}</Text>
            <Text>{item.pob}</Text>
            <Button title="Editar" color="#3fbcd5" onPress={() => editarPais(item)} />
            <Button title="Eliminar" color="#cd1504" onPress={() => eliminarPais(item.id)} />
          </View>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
