import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import Item from './NewChordListItem';
const DATA = [1, 2, 3, 4, 5, 6, 7];

const NewChordList = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        data={DATA}
        renderItem={({index}) => {
          if (index < 2) return <Item isReady />;
          else return <Item />;
        }}
      />
    </View>
  );
};

export default NewChordList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 7,
  },
});
