import { Provider, Text } from 'react-native-paper';
import { MD3DarkTheme } from '../styles/Styles';
import { View } from 'react-native';

const ScoreScreen = (props) => {
  return (
    <Provider theme={MD3DarkTheme}>
      <View>
        {props.scores?.map((score, j) => (
          <Text key={j}>
            {score.scoreData}
            {score.name}
          </Text>
        ))}
      </View>
    </Provider>
  );
};

export default ScoreScreen;
