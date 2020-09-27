import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import Item from './FavoriteListItem';
const DATA = [1, 2, 3, 4, 5, 6, 7];

const FavoriteList = () => {
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

export default FavoriteList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 3,
  },
});
