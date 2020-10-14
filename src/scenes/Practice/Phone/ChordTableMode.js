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
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';
import {BACKGROUND_COLOR} from '@constants/color';
import {colors} from '@constants/color';
import {WIDTH, HEIGHT} from '@constants/dimensions';
import getNoteTimeEachNote from '@utils/getTimeEachNote';

import PianoPartView from '@components/piano/PianoPartView';
import Header from '@components/practice/phone/Header';

EStyleSheet.build({$rem: WIDTH / 380});
const RATIO = HEIGHT / WIDTH;
//const RATIO = 1;

//using in chord-table
let anim = new Animated.Value(0);
let currentxPos = 0;
let framexPos = 0;
let moveCount = 0;

//using in play
let isStart = false;
let curTime = 0;
let startTime = 0;
let leftNoteArrIdx = 0;
let rightNoteArrIdx = 0;
let playedLeftNoteKeys = [];
let playedRightNoteKeys = [];

var chordTableFirstExecuted = true;
var chordTableFirstMove = true;
//const moveDistance = 4;
const moveDistance = EStyleSheet.value(`30 * ${RATIO} * $rem `);

const ChordTableMode = ({navigation, route: {params}}) => {
  const [youtubeStart, setYoutubeStart] = useState(false);
  const [touchedKey, setTouchedKey] = useState([]);
  const [nextKey, setNextKey] = useState([]);
  const [chordSync, setChordSync] = useState(0);
  const [pianoSync, setPianoSync] = useState(0);
  const scrollViewRef = useRef();
  const youtubeRef = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  const {
    chord_arr: {notes},
    left_note_arr,
    right_note_arr,
  } = params;

  // const leftNoteTimeArr = getNoteTimeEachNote(left_note_arr.items);
  // const rightNoteTimeArr = getNoteTimeEachNote(right_note_arr.items);

  const minusChordSync = () => {
    setChordSync(chordSync - 0.05);
  };

  const plusChordSync = () => {
    setChordSync(chordSync + 0.05);
  };

  const minusPianoSync = () => {
    setPianoSync(pianoSync - 0.05);
  };

  const plusPianoSync = () => {
    setPianoSync(pianoSync + 0.05);
  };

  const animationStyles = {
    transform: [{translateX: anim}],
  };

  const start = () => {
    setYoutubeStart(true);
  };

  //TODO: PianoSampler.stopNote 추가
  const backwardRewind = () => {
    currentxPos = 0;
    anim = new Animated.Value(0);
    framexPos = 0;
    moveCount = 0;
    isStart = false;
    curTime = 0;
    startTime = 0;
    leftNoteArrIdx = 0;
    rightNoteArrIdx = 0;
    playedLeftNoteKeys = [];
    playedRightNoteKeys = [];
    chordTableFirstExecuted = true;
    chordTableFirstMove = true;
    youtubeRef.current.seekTo(0);
    setYoutubeStart(false);
    scrollViewRef.current.scrollTo({x: 0});
  };

  //TODO: 끝났을 때의 처리
  const updateHandler = () => {
    if (!isStart) return;
    if (chordTableFirstExecuted) {
      chordTableFirstExecuted = false;
      console.log('Engine START');
      //시작 전 nextKey setting
      if (right_note_arr.items[rightNoteArrIdx].key.length !== 0) {
        let tmpArr = [];
        right_note_arr.items[rightNoteArrIdx].key.forEach((key) => {
          tmpArr.push(key.midiNum - 12);
        });
        setNextKey(tmpArr);
      }
    }
    var elapsedTime = Date.now() - startTime;
    curTime = (elapsedTime / 1000).toFixed(3);

    //move chord table
    if (curTime >= notes[moveCount].second + chordSync) {
      if (chordTableFirstMove) {
        chordTableFirstMove = false;
        moveCount++;
      } else {
        framexPos += moveDistance;
        moveCount++;
        if (moveCount !== 1 && moveCount % 4 === 1) {
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
    }

    // if (
    //   curTime >=
    //   playedRightNoteTime + rightNoteTimeArr[rightNoteTimeArrIdx]
    // ) {
    //   playedRightNoteKeys.forEach((key) => {
    //     PianoSampler.stopNote(key.midiNum);
    //   });
    //   console.log(rightNoteTimeArr[rightNoteTimeArrIdx]);
    //   rightNoteTimeArrIdx++;
    //   playedRightNoteTime = 9999;
    // }

    // if (curTime >= playedLeftNoteTime + leftNoteTimeArr[leftNoteTimeArrIdx]) {
    //   playedLeftNoteKeys.forEach((key) => {
    //     PianoSampler.stopNote(key.midiNum);
    //   });
    //   leftNoteTimeArrIdx++;
    //   playedLeftNoteTime = 9999;
    // }

    //play chord
    if (curTime >= right_note_arr.items[rightNoteArrIdx].second + pianoSync) {
      if (right_note_arr.items[rightNoteArrIdx].key.length !== 0) {
        if (right_note_arr.items[rightNoteArrIdx].key[0].noteOn === 1) {
          let tmpArr = [];
          right_note_arr.items[rightNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
            tmpArr.push(key.midiNum - 12);
          });
          setTouchedKey(tmpArr);
          //set next key TODO: 배열 범위 넘어갔을 때 분기
          for (var i = 1; i < 100; i++) {
            if (right_note_arr.items[rightNoteArrIdx + i].key.length !== 0) {
              if (
                right_note_arr.items[rightNoteArrIdx + i].key[0].noteOn === 1
              ) {
                let tmpArr2 = [];
                right_note_arr.items[rightNoteArrIdx + i].key.forEach((key) => {
                  tmpArr2.push(key.midiNum - 12);
                });
                setNextKey(tmpArr2);
                break;
              }
            }
          }
          playedRightNoteTime = curTime;
          playedRightNoteKeys = right_note_arr.items[rightNoteArrIdx].key;
        }
      } else {
        // N chord
        setTouchedKey([]);
        playedRightNoteKeys.forEach((key) => {
          PianoSampler.stopNote(key.midiNum);
        });
        playedRightNoteKeys = [];
      }
      rightNoteArrIdx++;
    }

    if (curTime >= left_note_arr.items[leftNoteArrIdx].second + pianoSync) {
      if (left_note_arr.items[leftNoteArrIdx].key.length !== 0) {
        if (left_note_arr.items[leftNoteArrIdx].key[0].noteOn === 1) {
          left_note_arr.items[leftNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
          });
          playedLeftNoteTime = curTime;
          playedLeftNoteKeys = left_note_arr.items[leftNoteArrIdx].key;
        }
      } else {
        playedLeftNoteKeys.forEach((key) => {
          PianoSampler.stopNote(key.midiNum);
        });
        playedLeftNoteKeys = [];
      }
      leftNoteArrIdx++;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <GameLoop onUpdate={updateHandler}>
        <Header navigation={navigation} title={params.meta.songName} />

        <View style={[styles.bodyContainer, {alignItems: 'center'}]}>
          <TouchableOpacity onPress={null} style={{flex: 1}}>
            <View style={styles.toggleBtnView}>
              <Text style={styles.toggleBtnText}>CHORD</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.syncView}>
              <Text style={styles.buttonTitleText}>CHORD</Text>
              <SimpleLineIcons
                style={[
                  styles.buttonIconSmall,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}
                name="arrow-left"
                onPress={youtubeStart ? null : minusChordSync.bind()}
              />
              <Text
                style={[
                  styles.syncNumberText,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}>
                {chordSync.toFixed(2)}
              </Text>
              <SimpleLineIcons
                style={[
                  styles.buttonIconSmall,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}
                name="arrow-right"
                onPress={youtubeStart ? null : plusChordSync.bind()}
              />
            </View>
            <View style={styles.syncView}>
              <Text style={styles.buttonTitleText}>PIANO</Text>
              <SimpleLineIcons
                style={[
                  styles.buttonIconSmall,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}
                name="arrow-left"
                onPress={youtubeStart ? null : minusPianoSync.bind()}
              />
              <Text
                style={[
                  styles.syncNumberText,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}>
                {pianoSync.toFixed(2)}
              </Text>
              <SimpleLineIcons
                style={[
                  styles.buttonIconSmall,
                  youtubeStart && {color: colors.grey30Dimmed2},
                ]}
                name="arrow-right"
                onPress={youtubeStart ? null : plusPianoSync.bind()}
              />
            </View>
            <TouchableOpacity onPress={backwardRewind.bind()}>
              <Feather style={styles.buttonIconLarge} name="skip-back" />
            </TouchableOpacity>
            <TouchableOpacity onPress={start.bind()}>
              <Feather style={styles.buttonIconLarge} name="play" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <Animated.View style={[styles.focusFrame, animationStyles]} />
          <ScrollView horizontal ref={scrollViewRef}>
            {notes.map(({name}, index) => {
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
              <PianoPartView
                firstKey="f2"
                touchedKey={touchedKey}
                nextKey={nextKey}
              />
            </View>
          </View>
          <View style={styles.footSub2}>
            <View style={{flex: 1}} />
            <View style={{flex: 2, backgroundColor: 'purple'}}>
              <Youtube
                apiKey="AIzaSyCQ-t9tVNIlNhN4jKlAHsNmYoaMs7IuyWE" //For using Youtube API in Android
                ref={youtubeRef}
                videoId={params.meta.link} // The YouTube video ID
                origin="http://www.youtube.com"
                play={youtubeStart} // control playback of video with true/false
                onReady={(e) => console.log(e)}
                onChangeState={(e) => {
                  if (e.state === 'playing') {
                    isStart = true;
                    startTime = Date.now();
                    console.log('START');
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
  buttonIconLarge: {
    color: colors.neonText2,
    fontSize: 28,
  },
  buttonIconSmall: {
    color: colors.neonText2,
    fontSize: 22,
  },
  buttonTitleText: {
    fontFamily: 'OpenSauceSans-Black',
    fontSize: 18,
    color: colors.grey152,
    marginRight: 5,
  },
  syncView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncNumberText: {
    fontFamily: 'OpenSauceSans-Light',
    fontSize: 18,
    color: colors.grey952,
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
    fontSize: `15rem * ${RATIO}`,
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
