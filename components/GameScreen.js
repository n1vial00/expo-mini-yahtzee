import React from "react";
import { Pressable, View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button} from 'react-native-paper';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';


export default Gameboard = (props) => {

    const [dice, setDice] = React.useState([[0,1],[0,1],[0,1],[0,1],[0,1]]);
    const [throws, setThrows] = React.useState(3);
    const [scores, setScores] = React.useState([[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]);
    const [total, setTotal] = useState(0);
    const [notification, setNotification] = useState("");

    const getRandomNumber = () => {
        const freshScores = [...scores];
        for(i = 0; i <=5; i++) {
            if(freshScores[i][1] == 1) {
                freshScores[i][0] = 0;
            }
        }

        for(i = 0; i <=4; i++) {
            if(dice[i][1] == 1 && throws >= 1){
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                const newDice = [...dice];
                newDice[i][0] = randomNumber;
                setDice(newDice);
                setThrows(throws - 1);
            }
            if(scores[dice[i][0]-1][1] == 1) {
                const newScores = freshScores;
                newScores[dice[i][0]-1][0] += 1;
                setScores(newScores);
            }
        }
        setNotification("");
    }

    const countTotal = () => {
        let calculatedTotal = 0;
        for (let i = 0; i <= 5; i++) {
          if (scores[i][1] == 0) {
            calculatedTotal += scores[i][0] * (i + 1);
          }
        }
        if (calculatedTotal >= 63) {
          calculatedTotal += 50;
        }
        setTotal(calculatedTotal);
      }

    const toggleState = (num, state, unlocked) => {
        if(state == 1) {
            const newDice = [...dice];
            if(newDice[num][1] == 1) {
                newDice[num][1] = 0;
            } else {
                newDice[num][1] = 1;
            }
            setDice(newDice);
        } else if(state === 2 && unlocked == 1) {
            const newScores = [...scores];
            newScores[num][1] = 0;
            for(i = 0; i <=5; i++) {
                if(newScores[i][1] == 1) {
                    newScores[i][0] = 0;
                }
            }
            setScores(newScores);
            resetter(0);
        } else {
            setNotification("Illegal move! Are you out of moves?");
        }
    }
    const resetter = (i) => {
        setDice([[0,1],[0,1],[0,1],[0,1],[0,1]]);
        setThrows(3);
        if(i == 1) {
            setScores([[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]);
            setTotal(0);
        }
        countTotal();
    }

    const buttonHandler = () => {
        props.onUpdate(total);
        resetter(1);
        setNotification("Score submitted! Roll again to start a new game!");
    }


    return (
        <Provider theme={MD3DarkTheme}>
            <View style={Styles.mainContainer}>
                <Text style={Styles.notification}>
                    {notification}
                </Text>
                <View style={Styles.container}>
                    {/* Dice */}
                    {dice[0][0] > 0 ?dice.map((die, i) => (
                        <Pressable key={i} onPress={() => toggleState(i, 1)}>
                            <MaterialCommunityIcons
                                name={"dice-" + (die[0])}
                                size={50} 
                                color={die[1] == 0 ? "orange" : "steelblue"}
                            >
                            </MaterialCommunityIcons>
                        </Pressable>
                    )) : 
                        <MaterialCommunityIcons
                                name={"dice-multiple"}
                                size={50} 
                                color={"steelblue"}
                        > 
                        </MaterialCommunityIcons>
                    }
                </View>
                <View style={Styles.container}>
                    {scores?.map((score, j) => (
                        <Pressable key={j} onPress={() => toggleState(j, 2, score[1])}>
                            <Text style={Styles.text}>
                                {score[0] * (j + 1)}
                            </Text>
                            <MaterialCommunityIcons
                                name={"numeric-" + (j+1) + "-circle"}
                                size={50} 
                                color={score[1] == 0 ? "orange" : "steelblue"}
                            >
                            </MaterialCommunityIcons>
                        </Pressable>
                    ))}
                </View>
                <Text style={Styles.text}>Number of throws left: {throws}</Text>
                <View style={Styles.container}>
                    <Pressable style={Styles.button} onPress={() => getRandomNumber()}>
                        <Text style={Styles.roll}>ROLL</Text>
                    </Pressable>
                </View>
                <Button 
                    title="Submit Score"
                    onPress={buttonHandler}
                >
                    Submit Score
                </Button>
                <Text>{total}</Text>
            </View>
        </Provider>
    )
}
