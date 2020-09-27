import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import renderItem from './RecentListItem';
const DATA = [1, 2, 3, 4, 5, 6, 7];

const RecentList = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList horizontal data={DATA} renderItem={renderItem} />
    </View>
  );
};

export default RecentList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 7,
  },
});
