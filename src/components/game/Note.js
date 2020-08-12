import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {RADIUS} from '../../constants/game/note';

const PinkNote = ({position}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS;
  return (
    <View
      style={[
        styles.finger,
        {left: x, top: y, backgroundColor: 'rgb(150,190,230)'},
      ]}
    />
  );
};

const BlueNote = ({position, color}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS;
  return (
    <View
      style={[
        styles.finger,
        {left: x, top: y, backgroundColor: 'rgb(170,230,110)'},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  finger: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: 5,
    width: 25,
    height: 25,
    position: 'absolute',
  },
});

export {PinkNote, BlueNote};
