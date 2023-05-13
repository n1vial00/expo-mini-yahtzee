import { Provider, MD3DarkTheme } from 'react-native-paper';
import { View, Table, Row, Rows } from 'react-native-table-component';
import Styles from '../styles/Styles';

const ScoreScreen = (props) => {
  const tableData = props.scores.map((score) => [score.name, score.scoreData]);

  return (
    <Provider theme={MD3DarkTheme}>
      <View style={Styles.mainContainer}>
        <Text style={Styles.top}>TOP 10 PLAYERS!</Text>
        <Table>
          <Row data={['Player', 'Score']} style={Styles.tableHeader} textStyle={Styles.tableHeaderText} />
          <Rows data={tableData} textStyle={Styles.tableRowText} />
        </Table>
      </View>
    </Provider>
  );
};

export default ScoreScreen;
