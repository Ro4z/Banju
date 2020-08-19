import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {RADIUS} from '../../constants/game/note';
import {HEIGHT} from '../../constants/dimensions';

const ChordNote = ({length, isRight, position}) => {
  const x = position[0] - RADIUS / 2;
  const y = position[1] - RADIUS;
  return (
    <View
      style={[
        styles.note,
        {
          left: x,
          top: y,
          backgroundColor: isRight ? 'rgb(150,190,230)' : 'rgb(170,230,110)',
          height: length * HEIGHT * 0.407,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  note: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: 5,
    width: 25,
    height: 0.407 * HEIGHT,
    position: 'absolute',
  },
});

export default ChordNote;
