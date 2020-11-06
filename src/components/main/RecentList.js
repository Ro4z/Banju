/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Item from './RecentListItem';

const RecentList = ({ historyJSON = {}, navigation }) => {
  const [historyArr, setHistoryArr] = useState([]);

  useEffect(() => {
    console.log('RECENT LIST');
    const tmp = Object.keys(historyJSON).map((key) => {
      return historyJSON[key];
    });
    tmp.sort((a, b) => {
      return a.playTime < b.playTime ? 1 : a.playTime > b.playTime ? -1 : 0;
    });
    setHistoryArr(tmp);
  }, [historyJSON]);

  return (
    <View style={styles.mainContainer}>
      {Object.keys(historyJSON).length !== 0 ? (
        <>
          <FlatList
            horizontal
            data={historyArr}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <Item data={item} navigation={navigation} />;
            }}
          />
        </>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            아직 Banju 기록이 없습니다! {'\n'}원하는 곡을 검색하여 연습해보세요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecentList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 7,
  },
});
