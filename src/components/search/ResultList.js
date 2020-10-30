import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Item from './ResultListItem';

const ResultList = ({ navigation, data, onScrollEnd }) => {
  console.log('onScrollEnd :>> ', onScrollEnd);
  const [showLoading, setShowLoading] = useState(false);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = +100;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };
  return (
    <View style={styles.mainContainer}>
      <Spinner visible={showLoading} />
      <FlatList
        data={data}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onScrollEnd();
          }
        }}
        scrollEventThrottle={3000}
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
    flex: 2,
  },
});
