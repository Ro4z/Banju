import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import List from './RecentList';
Icon.loadFont();
const TrendList = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        <Icon name="fire" style={styles.title} /> Trending
      </Text>
      <List />
    </View>
  );
};

export default TrendList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(235, 235, 245)',
  },
});
