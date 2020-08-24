import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './ChordTableItem';
import {BACKGROUND_COLOR} from '../../constants/color';

const ChordTable = ({position, chord}) => {
  const x = position[0];
  const y = position[1];
  const prev = chord[0];
  const cur = chord[1];
  const next = chord[2];

  return (
    <View style={[styles.mainContainer, {right: x, bottom: y}]}>
      <View style={styles.table}>
        <Item chord={prev} prev />
        <Item chord={cur} cur />
        <Item chord={next} next />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  table: {
    flexDirection: 'column',
  },
});
