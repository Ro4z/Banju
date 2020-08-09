import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './ChordTableItem';

const ChordTable = () => {
  const [prevChord, setPrevChord] = useState('');
  const [curChord, setCurChord] = useState('');
  const [nextChord, setNextChord] = useState('');

  return (
    <View style={styles.mainConatainer}>
      <View style={styles.table}>
        <Item />
        <Item cur />
        <Item />
      </View>
    </View>
  );
};

export default ChordTable;

const styles = StyleSheet.create({
  mainConatainer: {
    width: 200,
    height: 50,
  },
  table: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
