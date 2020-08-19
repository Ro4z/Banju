import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {BACKGROUND_COLOR} from '../../constants/color';
import {WIDTH, HEIGHT} from '../../constants/dimensions';

const UserGraph = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>연습 추이</Text>
      <LineChart
        withInnerLines={false}
        data={{
          labels: ['4월', '5월', '6월', '7월', '8월'],
          datasets: [
            {
              data: [
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
              ],
            },
          ],
        }}
        width={(WIDTH * 2) / 5}
        height={HEIGHT / 3}
        yAxisLabel=""
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: BACKGROUND_COLOR,
          backgroundGradientTo: BACKGROUND_COLOR,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
          labelColor: () => '#fff',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '7',
            strokeWidth: '4',
            stroke: 'rgb(50,190,70)',
          },
        }}
        bezier
      />
    </View>
  );
};

export default UserGraph;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 40,
  },
});
