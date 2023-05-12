import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';
import Styles from '../styles/Styles';


export default RulesScreen = ({ route, navigation  }) => {

    return (
        <Provider theme={MD3DarkTheme}>
            <View>
                <Text>
                    THE GAME: Upper section of the classic Yahtzee dice game. You have {route.params.NBR_OF_DICES} dices and for the every dice you have {route.params.NBR_OF_THROWS} throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from {route.params.MIN_SPOT} to {route.params.MAX_SPOT}. Game ends when all points have been selected. The order for selecting those is free. POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from {route.params.MIN_SPOT} to {route.params.MAX_SPOT} again. GOAL: To get points as much as possible. {route.params.BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives you {route.params.BONUS_POINTS} points more.
                </Text>
                <Button onPress={() => navigation.navigate("GAME")}>Understood</Button>
            </View>
        </Provider>
    )
}