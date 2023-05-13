import { Provider, Text, MD3DarkTheme } from 'react-native-paper';
import { View } from 'react-native';
import Styles from '../styles/Styles';

const ScoreScreen = (props) => {
  return (
    <Provider theme={MD3DarkTheme}>
      <View style={Styles.mainContainer}>
        <Text style={Styles.top}>TOP 10 PLAYERS!</Text>
        <Text>Player - Score</Text>
        {props.scores?.map((score, j) => (
          <Text key={j}>
            {score.name} - {score.scoreData}
          </Text>
        ))}
      </View>
    </Provider>
  );
};

export default ScoreScreen;
