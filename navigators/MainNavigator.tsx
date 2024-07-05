import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegistroPais from '../screens/RegistroPais';
import ShowPaises from '../screens/ShowPaises';
import EditaPais from '../screens/EditaPais';
import ListaApi from '../screens/ListaApi';



// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Registro' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Registro" component={RegistroPais} />
            <Tab.Screen name="Mostrar" component={ShowPaises}  />
            <Tab.Screen name="Editar" component={EditaPais} />
            <Tab.Screen name="Lista" component={ListaApi} />
            
    
        </Tab.Navigator>
    );
}

// Stack Navigator
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />      
            <Stack.Screen name="BottomTab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}


// Main Navigator Component
export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}