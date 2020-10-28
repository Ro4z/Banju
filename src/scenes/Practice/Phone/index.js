import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import KeyboardMode from './KeyboardMode';
import ChordTableMode from './ChordTableMode';

const Phone = ({ navigation, route }) => {
  const [playMode, setPlayMode] = useState('chord');
  return playMode === 'chord' ? (
    <ChordTableMode navigation={navigation} route={route} />
  ) : (
    <KeyboardMode navigation={navigation} route={route} />
  );
};

export default Phone;

const styles = StyleSheet.create({});
