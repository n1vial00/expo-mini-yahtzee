import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import ScoreScreen from './components/ScoreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from './styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Tab = createBottomTabNavigator();



function getOptions(){
  return {
    tabBarStyle: {backgroundColor: MD3DarkTheme.colors.primary},
    tabBarInactiveBackgroundColor: MD3DarkTheme.colors.primaryContainer,
    tabBarActiveTintColor: MD3DarkTheme.colors.onPrimary,
    
  };
}

export default function App() {
  const STORAGE_KEY = "@Y_Key"
  const [scoreData, setScoreData] = useState('initial value');

  useEffect(() => {
    // Store the updated child data in AsyncStorage
    storeData(STORAGE_KEY, scoreData);
  }, [scoreData]);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log('Error storing data:', e)
    }
  }

  const handleScoreDataUpdate = (newData) => {
    // Update the child data state when it changes
    setScoreData(newData);
  }

  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={getOptions} sceneContainerStyle={{ backgroundColor: 'black' }}>
          <Tab.Screen  
            name="HOME"
            component={HomeScreen}
            STORAGE_KEY={STORAGE_KEY}
          />
          <Tab.Screen 
            name="GAME"
            component={GameScreen}
            STORAGE_KEY={STORAGE_KEY}
            data={scoreData}
            onUpdate={handleScoreDataUpdate}
          />
          <Tab.Screen
            name="SCORE"
            component={ScoreScreen}
            STORAGE_KEY={STORAGE_KEY}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
