import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import RulesScreen from './components/RulesScreen';
import GameScreen from './components/GameScreen';
import ScoreScreen from './components/ScoreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from './styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Rule values:
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const MIN_SPOT = 1;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63;
const BONUS_POINTS = 50;

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
  const [hiScores, setHiScores] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (key, data) => {
    try {
      const playerData = {
        name: playerName,
        time: new Date().toISOString(),
        scoreData: data
      };
      console.log('Player data:', playerData);
      const sendData = JSON.stringify(playerData)
      await AsyncStorage.setItem(key, sendData)
    } catch (e) {
      console.log('Error storing data:', e)
    }
  }

  const getData = async () => {
    try {
      if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null) {
          console.log('Value retrieved from storage:', value);
          const newScores = JSON.parse(value);
          const parsedScores = newScores.map((playerData) => ({
            name: playerData.name,
            time: playerData.time,
            scoreData: playerData.scoreData,
          }));
          console.log('Parsed scores:', newScores);
          setHiScores(parsedScores);
          console.log('Updated high scores:', hiScores);
        } else {
          console.log('No value stored under key:', STORAGE_KEY);
        }
      } else {
        console.log('AsyncStorage is not defined or getItem is not a function');
      }
    } catch (e) {
      console.log('Error retrieving data:', e);
    }
  }

  const handleScoreDataUpdate = (newData) => {
    setScoreData(newData);
    console.log("Score data setting attempted. Next Storing data.");
    storeData(STORAGE_KEY, newData);
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
            name="RULES"
            component={RulesScreen}
            options={{
              tabBarButton: (props) => null,
              tabBarStyle: { display: 'none' }
            }}
            initialParams={{
              NBR_OF_DICES: NBR_OF_DICES,
              NBR_OF_THROWS: NBR_OF_THROWS,
              MIN_SPOT:MIN_SPOT,
              MAX_SPOT: MAX_SPOT,
              BONUS_POINTS_LIMIT: BONUS_POINTS_LIMIT,
              BONUS_POINTS: BONUS_POINTS
            }}
          />
          <Tab.Screen
            name="GAME"
            component={GameScreen}
            initialParams={{ 
              onUpdate: handleScoreDataUpdate,
              NBR_OF_DICES: NBR_OF_DICES,
              NBR_OF_THROWS: NBR_OF_THROWS,
              MIN_SPOT:MIN_SPOT,
              MAX_SPOT: MAX_SPOT,
              BONUS_POINTS_LIMIT: BONUS_POINTS_LIMIT,
              BONUS_POINTS: BONUS_POINTS
            }}
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
