import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../assets/fondoG.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>PABLO JIMENEZ</Text>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('BottomTab')}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "rgba(255,255,255,.95)",
    fontSize: 27,
    position: 'absolute',
    top: 100,  
  },
  btn: {
    backgroundColor: 'white', 
    width: '50%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18, 
    color: 'black', 
  }
});
