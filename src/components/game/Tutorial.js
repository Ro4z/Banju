import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {WIDTH, HEIGHT} from '../../constants/dimensions';
import {BlueNote, PinkNote} from '../game/Note';

const Tutorial = ({onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.btnText}>시작하기</Text>
      </TouchableOpacity>
      <Text style={[styles.text, {position: 'absolute', top: 220, left: 40}]}>
        Youtube 가 재생됩니다
      </Text>
      <Text style={[styles.text, {position: 'absolute', top: 140, left: 380}]}>
        버튼을 통해 제어할 수 있습니다
      </Text>
      <Text style={[styles.text, {position: 'absolute', top: 220, right: 450}]}>
        곡 재생 바 입니다
      </Text>
      <Text style={[styles.text, {position: 'absolute', top: 150, right: 100}]}>
        연주하는 코드들이 나열됩니다
      </Text>
      <Text style={[styles.text, {position: 'absolute', top: 420, right: 70}]}>
        떨어지는 노트에 맞춰서 연주해보세요!
      </Text>
      <Text
        style={[styles.text, {position: 'absolute', bottom: 150, right: 570}]}>
        앱에서 직접{'\n'}연주해볼 수 있습니다
      </Text>
      <BlueNote position={[800, 400]} />
      <PinkNote position={[900, 500]} />
    </View>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  mainContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#0A84FF',
    fontSize: 40,
  },
  text: {
    color: 'rgb(200,200,200)',
    fontSize: 30,
  },
});
