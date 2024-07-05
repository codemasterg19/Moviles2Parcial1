import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'

export default function ListaApi() {

const API_TIENDA ="https://api.sampleapis.com/rickandmorty/characters"
const [data, setdata] = useState([])

useEffect(() => {
  fetch(API_TIENDA)
  .then(response => response.json())
  .then(datos => setdata(datos))

    console.log(data);
}, [])

type Producto ={
    title:string,
    name: string,
    image:string,
    price:number,
    description:string
}

function informacion(producto: Producto){
    Alert.alert('DETALLES', 'Descripción'+ producto.description)
}

  return (
    <View style={styles.container}>
      <Text>ListaScreen2</Text>
      <FlatList
      data={data}
      renderItem={ ( { item } : {item:Producto} )=>
        <TouchableOpacity style={styles.item} onPress={ () => informacion(item)}>
            <Text style={styles.text}>{item.title}</Text>
            <Image
            source={{uri: item.image}}
            style={styles.img}
            />
            <Text>Nombre:{item.name}</Text>
        </TouchableOpacity >
     }
      />
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    item:{
        backgroundColor:'#9ad8f9',
        margin:10,
        borderRadius:15,
        alignItems: 'center'

    },
    img:{
        height:100,
        width:200,
        resizeMode:'contain'
    },
    text:{
        fontWeight:'bold'

    },

})
