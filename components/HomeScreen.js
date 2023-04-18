import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from '../styles/Styles';


export default HomeScreen = ({ data, onUpdate }) => {
    const [playerName, setPlayerName] = useState("")

    return (
        <Provider theme={MD3DarkTheme}>
            <View>
                <Text>Who's Playing?</Text>
                <TextInput mode='outlined' label='Player Name' value={playerName} onChangeText={t=> setPlayerName(t)}/>
                <Button>Submit</Button>
                <Text>{playerName}</Text>
                <Text>{data}</Text>
            </View>
        </Provider>
    )
}
