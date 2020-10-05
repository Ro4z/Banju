import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import KeyboardMode from './KeyboardMode';
import ChordTableMode from './ChordTableMode';

const Phone = () => {
  const [playMode, setPlayMode] = useState('chord');
  return playMode === 'chord' ? <ChordTableMode /> : <KeyboardMode />;
};

export default Phone;

const styles = StyleSheet.create({});
