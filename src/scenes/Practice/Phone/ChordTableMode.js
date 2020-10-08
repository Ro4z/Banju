import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {GameEngine, GameLoop} from 'react-native-game-engine';
import Youtube from 'react-native-youtube';
import PianoSampler from 'react-native-piano-sampler';

import Feather from '@assets/icon/Feather';
import {BACKGROUND_COLOR} from '@constants/color';
import {colors} from '@constants/color';
import {WIDTH, HEIGHT} from '@constants/dimensions';
import {chordArr, leftNoteArr, rightNoteArr} from '@constants/sample_code';

import PianoPartView from '@components/piano/PianoPartView';
import Header from '@components/practice/phone/Header';

EStyleSheet.build({$rem: WIDTH / 380});
const RATIO = HEIGHT / WIDTH;
//const RATIO = 1;

//using in chord-table
const anim = new Animated.Value(0);
let currentxPos = 0;
let framexPos = 0;
let moveCount = 0;

//using in play
let isStart = false;
let curTime = 0;
let startTime = 0;
let leftNoteArrIdx = 0;
let rightNoteArrIdx = 0;

//const moveDistance = 4;
const moveDistance = EStyleSheet.value(`30 * ${RATIO} * $rem `);

console.log(RATIO);
console.log(EStyleSheet.value('$rem'));

const ChordTableMode = ({navigation}) => {
  const [ytStart, setYtStart] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  const animationStyles = {
    transform: [{translateX: anim}],
  };

  const start = () => {
    setYtStart(true);
    return;
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

  const updateHandler = () => {
    if (!isStart) return;

    var elapsedTime = Date.now() - startTime;
    curTime = (elapsedTime / 1000).toFixed(3);

    //move chord table
    if (curTime >= chordArr[moveCount].second) {
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
    }

    //play chord

    if (curTime >= rightNoteArr[rightNoteArrIdx].second) {
      if (rightNoteArr[rightNoteArrIdx].key[0].noteOn === 1) {
        rightNoteArr[rightNoteArrIdx].key.forEach((key) => {
          PianoSampler.playNote(key.midiNum, 115);
        });
      }
      rightNoteArrIdx++;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <GameLoop onUpdate={updateHandler}>
        <Header navigation={navigation} />
        <View style={[styles.bodyContainer, {alignItems: 'center'}]}>
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
            {chordArr.map(({name}, index) => {
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
        <View style={styles.footContainer}>
          <View style={styles.footSub1}>
            <View style={{width: '100%', height: '100%'}}>
              <PianoPartView firstKey="f2" />
            </View>
          </View>
          <View style={styles.footSub2}>
            <View style={{flex: 1}} />
            <View style={{flex: 2, backgroundColor: 'purple'}}>
              <Youtube
                apiKey="AIzaSyCQ-t9tVNIlNhN4jKlAHsNmYoaMs7IuyWE" //For using Youtube API in Android
                ref={(ref) => (this.ytRef = ref)}
                videoId="HHupVXtnjRs" // The YouTube video ID
                play={ytStart} // control playback of video with true/false
                onReady={(e) => console.log(e)}
                onChangeState={(e) => {
                  if (e.state === 'playing') {
                    isStart = true;
                    startTime = Date.now();
                  }
                }}
                // onChangeQuality={(e) => console.log(e)}
                // onError={(e) => console.log(e)}
                style={styles.youtube}
                controls={0}
              />
            </View>
          </View>
        </View>
      </GameLoop>
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
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...ifIphoneX({paddingHorizontal: 60}, {paddingHorizontal: 30}),
  },
  footContainer: {
    flex: 1.3,
    flexDirection: 'row',
    backgroundColor: '#0d0d0d',
    paddingBottom: 20,
    ...ifIphoneX({paddingHorizontal: 60}, {paddingHorizontal: 30}),
  },
  footSub1: {
    flex: 2,
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  footSub2: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
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
    width: `28rem * ${RATIO}`,
    height: `28rem * ${RATIO}`,
    borderWidth: 2,
    borderColor: 'rgb(85,60,230)',
    borderRadius: 7,
    zIndex: 1,
    top: 10,
    ...ifIphoneX({left: 60}, {left: 30}),
  },
  chordTableBox: {
    width: `27rem * ${RATIO}`,
    height: `27rem * ${RATIO}`,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26,1)',
  },
  chordTableBoxFrame: {
    width: `30rem * ${RATIO}`,
    height: `30rem * ${RATIO}`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },
  chordTableText: {
    color: 'white',
    fontSize: `18rem * ${RATIO}`,
    fontWeight: '600',
  },
  divider: {
    width: 15,
    height: `40rem * ${RATIO}`,
    backgroundColor: 'rgb(0,0,0)',
  },

  //youtube
  youtube: {
    flex: 1,
  },
});
