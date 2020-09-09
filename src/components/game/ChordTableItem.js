import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChordTableItem = ({chord, prev, cur, next, judge}) => {
  return (
    <View style={styles.mainContainer}>
      <Text
        style={[
          styles.chordText,
          {
            color: cur ? 'white' : 'rgba(128,128,128,0.2)',
          },
        ]}>
        {chord}
      </Text>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={[
            styles.judgeText,
            {
              fontSize: cur ? 40 : 30,
              color: cur
                ? 'rgb(125,125,125)'
                : judge === '좋습니다!'
                ? 'rgba(90,160,240,0.7)'
                : 'rgba(240,160,90,0.7)',
            },
          ]}>
          {cur ? '...' : judge}
        </Text>
      </View>
    </View>
  );
};

export default ChordTableItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: 270,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 30,
  },
  chordText: {
    fontSize: 40,
    alignItems: 'center',
    flex: 1,
  },
  judgeText: {
    fontSize: 40,
    fontWeight: '600',
    color: 'rgb(90,160,240)',
    alignItems: 'center',
    flex: 3,
  },
});
