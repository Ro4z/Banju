import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

import Item from './ResultListItem';

const ResultList = ({ navigation, data }) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Item navigation={navigation} data={item} />;
        }}
        keyExtractor={(item) => item.id}
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
