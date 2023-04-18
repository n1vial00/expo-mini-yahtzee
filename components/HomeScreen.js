import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from '../styles/Styles';


export default HomeScreen = ({ route, navigation }) => {
    const [playerName, setPlayerName] = useState("")
    const { nameChange } = route.params;
    
    const handlePlayerChange = () => {
        nameChange(playerName);
        console.log(playerName);
        navigation.navigate("GAME")
      }

    return (
        <Provider theme={MD3DarkTheme}>
            <View>
                <Text>Who's Playing?</Text>
                <TextInput mode='outlined' label='Player Name' value={playerName} onChangeText={t=> setPlayerName(t)}/>
                <Button onPress={() => handlePlayerChange()}>Submit</Button>
                <Text>{playerName}</Text>
            </View>
        </Provider>
    )
}
