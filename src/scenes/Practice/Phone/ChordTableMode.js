import React, {useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import Header from '@components/practice/phone/Header';
import Feather from '@assets/icon/Feather';
import {BACKGROUND_COLOR} from '@constants/color';
import {colors} from '@constants/color';
import {SAMPLE} from '@constants/game/output_sample';

//using in chord-table
const anim = new Animated.Value(0);
let currentxPos = 0;
let framexPos = 0;
let moveCount = 0;
const moveDistance = EStyleSheet.value('30 * $rem');

const ChordTableMode = ({navigation}) => {
  const scrollViewRef = useRef();
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  const animationStyles = {
    transform: [{translateX: anim}],
  };

  const start = () => {
    setInterval(() => {
      framexPos += moveDistance;
      moveCount++;
      if (moveCount % 4 === 0) {
        framexPos = 0;
        currentxPos += moveDistance * 4 + 15;
        scrollViewRef.current.scrollTo({x: currentxPos});
      }
      Animated.spring(anim, {
        toValue: framexPos,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 900);
  };

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={null}>
          <View style={styles.toggleBtnView}>
            <Text style={styles.toggleBtnText}>CHORD</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={start.bind()}>
          <Feather
            style={{color: colors.neonText2, fontSize: 28}}
            name="play"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <Animated.View style={[styles.focusFrame, animationStyles]} />
        <ScrollView horizontal ref={scrollViewRef}>
          {SAMPLE.items.chord.notes.map(({name}, index) => {
            if (index % 4 === 3) {
              return (
                <>
                  <View style={styles.chordTableBoxFrame}>
                    <View style={styles.chordTableBox}>
                      <Text style={styles.chordTableText}>{name}</Text>
                    </View>
                  </View>
                  <View style={styles.divider} />
                </>
              );
            } else {
              return (
                <>
                  <View style={styles.chordTableBoxFrame}>
                    <View style={styles.chordTableBox}>
                      <Text style={styles.chordTableText}>{name}</Text>
                    </View>
                  </View>
                </>
              );
            }
          })}
        </ScrollView>
      </View>
      <View style={styles.footContainer}></View>
    </View>
  );
};

export default ChordTableMode;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  bodyContainer: {
    flex: 1,
    ...ifIphoneX({paddingHorizontal: 60}, {paddingHorizontal: 30}),
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footContainer: {
    flex: 1.5,
    backgroundColor: '#0d0d0d',
    ...ifIphoneX({paddingHorizontal: 60}, {paddingHorizontal: 30}),
  },
  toggleBtnView: {
    height: 55,
    width: 130,
    borderRadius: 50,
    backgroundColor: colors.grey10Popup2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnText: {
    fontFamily: 'OpenSauceSans-Black',
    fontSize: 15,
    color: colors.neonText2,
  },

  //chord table
  focusFrame: {
    position: 'absolute',
    width: '28rem',
    height: '28rem',
    borderWidth: 2,
    borderColor: 'rgb(85,60,230)',
    borderRadius: 7,
    zIndex: 1,
    top: 10,
    ...ifIphoneX({left: 60}, {left: 30}),
  },
  chordTableBox: {
    width: '27rem',
    height: '27rem',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26,1)',
  },
  chordTableBoxFrame: {
    width: '30rem',
    height: '30rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },
  chordTableText: {
    color: 'white',
    fontSize: '18rem',
    fontWeight: '600',
  },
  divider: {
    width: 15,
    height: '40rem',
    backgroundColor: 'rgb(0,0,0)',
  },
});
