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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function getOptions(){
  return {
    tabBarStyle: {backgroundColor: MD3DarkTheme.colors.primary},
    tabBarInactiveBackgroundColor: MD3DarkTheme.colors.primaryContainer,
    tabBarActiveTintColor: MD3DarkTheme.colors.onPrimary,
  };
}

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [scoreData, setScoreData] = useState(0);
  const [hiscores, setHiscores] = useState([]);
  const [scoreScreenKey, setScoreScreenKey] = useState(0);


  const STORAGE_KEY = "Y_Key";
  // Rule values:
  const NBR_OF_DICES = 5;
  const NBR_OF_THROWS = 3;
  const MIN_SPOT = 1;
  const MAX_SPOT = 6;
  const BONUS_POINTS_LIMIT = 63;
  const BONUS_POINTS = 50;

  useEffect(() => {
    if(scoreData > 0) {
      storeData();
    }
    getScores();
    setScoreScreenKey(scoreScreenKey + 1);
  }, [scoreData]);

  

  const storeData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      let data = existingData ? JSON.parse(existingData) : [];
      console.log("Got data: " + data);

      const playerData = {
        name: playerName,
        time: new Date().toISOString(),
        scoreData: scoreData
      };
      data.push(playerData);

      data.sort((a, b) => b.scoreData - a.scoreData);
      
      if (data.length > 10) {
        data.pop();
      }
      const sendData = JSON.stringify(data);
      console.log(sendData);
      await AsyncStorage.setItem(STORAGE_KEY, sendData)
    } catch (e) {
      console.log('Error storing data:', e)
    }
  }

  const getScores = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        console.log('Value retrieved from storage:', value);
        const newScores = JSON.parse(value);
        setHiscores(newScores);
      } else {
        console.log('No value stored under key:', STORAGE_KEY);
      }
    } catch (e) {
      console.log('Error retrieving data:', e);
    }
  }

  const handleScoreDataUpdate = (newData) => {
    const pulledData = newData;
    setScoreData(pulledData);
    console.log("Starting storing. newData: " + pulledData);

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
              tabBarStyle: { display: 'none' },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
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
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="dice-multiple" color={color} size={size} />
              ),
            }}
          >
          {() => <GameScreen onUpdate = {handleScoreDataUpdate} />}
          </Tab.Screen>
          <Tab.Screen 
            name="SCORE"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="trophy" color={color} size={size} />
              ),
            }}
          >
          {() => <ScoreScreen key= {scoreScreenKey} scores= {hiscores} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  );
}


