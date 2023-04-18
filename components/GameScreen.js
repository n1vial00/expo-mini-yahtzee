import React from "react";
import { Pressable, View } from "react-native";
import {MD3DarkTheme, Provider, Text, Button, TextInput} from 'react-native-paper';


export default Gameboard = () => {


    
    const [dice, setDice] = React.useState([[0,1],[0,1],[0,1],[0,1],[0,1]]);
    const [throws, setThrows] = React.useState(3);
    const [scores, setScores] = React.useState([[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]);

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
            }
            if(scores[dice[i][0]-1][1] == 1) {
                const newScores = freshScores;
                newScores[dice[i][0]-1][0] += 1;
                setScores(newScores);
            }
        }
        setThrows(throws - 1);
    }

    const toggleState = (num, state) => {
        if(state == 1) {
            const newDice = [...dice];
            
            if(newDice[num][1] == 1) {
                newDice[num][1] = 0
            } else {
                newDice[num][1] = 1
            }
            setDice(newDice);
        } else if(state == 2) {
            const newScores = [...scores];
            newScores[num][1] = 0;
            for(i = 0; i <=5; i++) {
                if(newScores[i][1] == 1) {
                    newScores[i][0] = 0;
                }
            }
            setScores(newScores);
            setThrows(3);
        }
    }


    return (
        <Provider theme={MD3DarkTheme}>
            <View>
                {/* Dice */}
                {dice.map((die, i) => (
                    <Pressable key={i} onPress={() => toggleState(i, 1)}>
                        <Text>
                            Die values: {die[0]} {die[1]}
                        </Text>
                    </Pressable>
                ))}

                {scores.map((score, j) => (
                    <Pressable key={j} onPress={() => toggleState(j, 2)}>
                        <Text>
                            Dump score in: {j + 1} {score[0] * (j + 1)}
                        </Text>
                    </Pressable>
                ))}

                <Text>{throws}</Text>

                <Pressable onPress={() => getRandomNumber()}>
                    <Text>ROLL</Text>
                </Pressable>
            </View>
        </Provider>
    )
}