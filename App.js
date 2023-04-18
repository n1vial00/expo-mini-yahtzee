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
    storeData(STORAGE_KEY, scoreData);
  }, [scoreData]);

  const storeData = async (STORAGE_KEY, value) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value)
    } catch (e) {
      console.log('Error storing data:', e)
    }
  }

  const getData = async (STORAGE_KEY) => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if (value !== null) {
        console.log('Value retrieved from storage:', value)
      } else {
        console.log('No value stored under key:', STORAGE_KEY)
      }
    } catch (e) {
      console.log('Error retrieving data:', e)
    }
  }

  const handleScoreDataUpdate = (newData) => {
    setScoreData(newData);
  }

  return (
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={getOptions} 
          sceneContainerStyle={{ backgroundColor: 'black' }}
        >
          <Tab.Screen  
            name="HOME"
            component={HomeScreen}
            options={{
              tabBarStyle: { display: 'none' }
            }}
          />
          <Tab.Screen 
            name="GAME"
            component={GameScreen}
            onUpdate={handleScoreDataUpdate}
          />
          <Tab.Screen
            name="SCORE"
            component={ScoreScreen}
            data={scoreData}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
