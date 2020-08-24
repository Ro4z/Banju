import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

import {WIDTH} from '../../constants/dimensions';
import {BACKGROUND_COLOR} from '../../constants/color';

const ProgressBar = ({position, progress = 0}) => {
  const x = position[0];
  const y = position[1];

  return (
    <View style={[styles.mainContainer, {left: x, top: y}]}>
      <Progress.Bar
        progress={progress}
        width={WIDTH - 440}
        height={15}
        color={'#00FF00'}
        unfilledColor={'rgba(128,128,128,0.5)'}
        borderColor={'white'}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
});
