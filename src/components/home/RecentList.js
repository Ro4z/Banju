import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Item1, Item2} from './RecentListItem';

const RecentList = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subMargin} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Item1 />
        <Item2 />
        <Item1 />
        <Item2 />
        <Item1 />
        <Item2 />
        <Item1 />
        <Item2 />
      </ScrollView>
    </View>
  );
};

export default RecentList;

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    height: 500,
  },
  subMargin: {
    marginTop: 15,
  },
  scrollView: {
    alignItems: 'center',
  },
});
