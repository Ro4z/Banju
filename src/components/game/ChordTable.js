import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './ChordTableItem';
import {BACKGROUND_COLOR} from '../../constants/color';

const ChordTable = ({position, chord, judge = ['', '좋습니다!']}) => {
  const x = position[0];
  const y = position[1];
  const prev = chord[0];
  const cur = chord[1];
  const next = chord[2];

  const prevJudge = judge[0];
  const curJudge = judge[1];

  return (
    <View style={[styles.mainContainer, {right: x, bottom: y}]}>
      <View style={styles.table}>
        <Item chord={prev} next />
        <Item chord={cur} cur judge={curJudge} />
        <Item chord={next} prev judge={prevJudge} />
      </View>
    </View>
  );
};

export default ChordTable;

const styles = StyleSheet.create({
  mainContainer: {
    width: 550,
    height: 330,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  table: {
    flexDirection: 'column',
  },
});
