import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";



export default Scoreboard = ({ route: { params: { scores } } }) => {

    console.log('scores:', scores);
    const scoresArray = Object.keys(scores).map((key) => ({
        name: key,
        ...scores[key],
    }));

    console.log(scoresArray);

    return (
        <View>
          {scoresArray.map((score, index) => (
            <Text key={index}>
              {score.time} {score.name} {score.scoreData}
            </Text>
          ))}
        </View>
    );
};
