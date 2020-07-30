import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {RADIUS} from '../../constants/game/note';

const PinkNote = ({position}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS;
  return (
    <View style={[styles.finger, {left: x, top: y, backgroundColor: 'pink'}]} />
  );
};

const BlueNote = ({position, color}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS;
  return (
    <View style={[styles.finger, {left: x, top: y, backgroundColor: 'blue'}]} />
  );
};

const styles = StyleSheet.create({
  finger: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    position: 'absolute',
  },
});

export {PinkNote, BlueNote};
