import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import Item from './PracticeListItem';

const PracticeList = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>자주 연습한 곡</Text>
      {/* TODO: change scrollview to flatlist */}
      <ScrollView horizontal style={{padding: 30, paddingTop: 10}}>
        <Item />
        <Item cover2 />
        <Item />
        <Item cover2 />
        <Item />
        <Item cover2 />
      </ScrollView>
    </View>
  );
};

export default PracticeList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 30,
  },
});
