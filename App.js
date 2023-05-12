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
  const [playerName, setPlayerName] = useState("")

  const STORAGE_KEY = "Y_Key";
  const [scoreData, setScoreData] = useState('');
  const [hiScores, setHiScores] = useState('');

  useEffect(() => {
    getData();
  }, [scoreData]);

  const storeData = async () => {
    try {
      const playerData = {
        name: playerName,
        time: new Date().toISOString(),
        scoreData: scoreData
      };
      const sendData = JSON.stringify(playerData)
      await AsyncStorage.setItem(STORAGE_KEY, sendData)
    } catch (e) {
      console.log('Error storing data:', e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        console.log('Value retrieved from storage:', value);
        const newScores = JSON.parse(value);
        setHiScores(newScores);
      } else {
        console.log('No value stored under key:', STORAGE_KEY);
      }
    } catch (e) {
      console.log('Error retrieving data:', e);
    }
  }

  const handleScoreDataUpdate = (newData) => {
    setScoreData(newData);
    storeData(STORAGE_KEY);
  }

  const handleDataChange = (data) => {
    console.log('Data changed:', data);
    setPlayerName(data);
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
            initialParams={{ nameChange: handleDataChange }}
          />
          <Tab.Screen 
            name="GAME"
            component={GameScreen}
            initialParams={{ onUpdate: handleScoreDataUpdate }}
          />
          <Tab.Screen
            name="SCORE"
            component={ScoreScreen}
            initialParams={{ scores: hiScores }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
