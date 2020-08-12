import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ResultListItem from './ResultListItem';

const ResultList = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ResultListItem cover2 navigation={navigation} />
      <ResultListItem navigation={navigation} />
      <ResultListItem cover2 />
      <ResultListItem />
    </View>
  );
};

export default ResultList;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 330,
    padding: 30,
    flexDirection: 'row',
  },
});
