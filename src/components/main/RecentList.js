import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Item from './RecentListItem';

const TEST_DATA = [
  { title: "BTS (방탄소년단) 'Dynamite'" },
  { title: '악동뮤지션 - 다이너소어(DINOSAUR)' },
  { title: 'HYUKOH(혁오) - TOMBOY' },
];

const RecentList = ({ historyJSON = {}, navigation }) => {
  console.log('Object.keys(historyJSON).length :>> ', Object.keys(historyJSON).length);
  return (
    <View style={styles.mainContainer}>
      {Object.keys(historyJSON).length !== 0 ? (
        <ScrollView horizontal>
          {Object.keys(historyJSON).map((key) => {
            return <Item data={historyJSON[key]} navigation={navigation} />;
          })}
        </ScrollView>
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
