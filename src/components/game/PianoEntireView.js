import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const PianoEntireView = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/img/sample_piano.png')}
        style={{width: '100%', height: 100, resizeMode: 'stretch'}}
      />
    </View>
  );
};

export default PianoEntireView;

//TODO: layout 점검
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(128,128,128,0.5)',
  },
});
