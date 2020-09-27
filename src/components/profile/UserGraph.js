import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {BACKGROUND_COLOR, colors} from '@constants/color';
import {WIDTH, HEIGHT} from '@constants/dimensions';

const UserGraph = () => {
  return (
    <View style={styles.mainContainer}>
      <LineChart
        withInnerLines={false}
        data={{
          labels: ['월', '화', '수', '목', '금', '토'],
          datasets: [
            {
              data: [
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
              ],
            },
          ],
        }}
        style={{marginTop: 30}}
        width={WIDTH * 0.95}
        height={300}
        yAxisLabel=""
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: '#0d0d0d',
          backgroundGradientFromOpacity: 0.6,
          backgroundGradientTo: '#0d0d0d',
          backgroundGradientToOpacity: 1,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 0.7) => `rgba(200, 200, 200, ${opacity})`,
          labelColor: () => '#fff',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '7',
            strokeWidth: '3',
            stroke: colors.neon2,
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
    flex: 7,
    width: 300,
    height: 300,
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 40,
  },
});
