import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import KeyboardMode from './KeyboardMode';
import ChordTableMode from './ChordTableMode';

const Phone = ({navigation}) => {
  const [playMode, setPlayMode] = useState('chord');
  return playMode === 'chord' ? (
    <ChordTableMode navigation={navigation} />
  ) : (
    <KeyboardMode navigation={navigation} />
  );
};

export default Phone;

const styles = StyleSheet.create({});
