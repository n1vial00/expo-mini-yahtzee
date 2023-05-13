import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from '../styles/Styles';

export default HomeScreen = ({ route, navigation }) => {
    const [playerName, setPlayerName] = useState("")

    const handlePlayerChange = () => {
        route.params.nameChange(playerName);
        console.log(playerName);
        navigation.navigate("RULES")
      }

    return (
        <Provider theme={MD3DarkTheme}>
            <View style={Styles.mainContainer}>
                <Text>Who's Playing?</Text>
                <TextInput style={Styles.input} mode='outlined' label='Player Name' value={playerName} onChangeText={t=> setPlayerName(t)}/>
                <Button onPress={() => handlePlayerChange()}>Submit</Button>
                <Text>{playerName}</Text>
            </View>
        </Provider>
    )
}
