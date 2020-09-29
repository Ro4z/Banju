import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';

import Item from './ResultListItem';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ResultList = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={DATA}
        renderItem={({index}) => {
          if (index < 3) return <Item isReady />;
          else return <Item />;
        }}
      />
    </View>
  );
};

export default ResultList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
