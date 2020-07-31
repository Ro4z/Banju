import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './ChordTableItem';

const ChordTable = () => {
  return (
    <View style={styles.mainConatainer}>
      <View style={styles.table}>
        <Item chord="C" />
        <Item />
        <Item />
        <Item />

        <Item chord="Am" />
        <Item />
        <Item />
        <Item />
        <Item chord="G7" />
        <Item />
        <Item />
        <Item />
        <Item chord="C" />
        <Item />
        <Item />
        <Item />
        <Item chord="C" />
        <Item />
        <Item />
        <Item />
      </View>
    </View>
  );
};

export default ChordTable;

const styles = StyleSheet.create({
  mainConatainer: {
    width: '100%',
    marginTop: 30,
    height: 120,
    padding: 20,
  },
  table: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
