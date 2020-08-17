import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {WIDTH, HEIGHT} from '../../constants/dimensions';

const CircleGraph = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>연습 목표</Text>
      <AnimatedCircularProgress
        size={300}
        width={20}
        fill={30}
        tintColor="rgb(50,190,70)"
        arcSweepAngle={270}
        rotation={225}
        duration={2000}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="rgb(100,100,100)"
        children={() => (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{color: 'rgb(50,190,70)', fontSize: 70, marginBottom: 10}}>
              2
            </Text>
            <View
              style={{
                backgroundColor: 'rgb(100,100,100)',
                width: 70,
                height: 5,
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 50,
                marginBottom: 30,
                marginTop: 10,
              }}>
              10{' '}
              <Text
                style={{
                  color: 'white',
                  fontSize: 35,
                  marginBottom: 30,
                  marginTop: 10,
                }}>
                min
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CircleGraph;

const styles = StyleSheet.create({
  mainContainer: {
    width: (WIDTH * 2) / 7,
    height: HEIGHT / 3,
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 40,
  },
});
