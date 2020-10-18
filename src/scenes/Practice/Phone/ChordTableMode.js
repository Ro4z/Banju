/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { GameLoop } from 'react-native-game-engine';
import Youtube from '@ro4z/react-native-youtube';
import PianoSampler from 'react-native-piano-sampler';

import Feather from '@assets/icon/Feather';
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';
import { BACKGROUND_COLOR, colors } from '@constants/color';
import { WIDTH, HEIGHT } from '@constants/dimensions';
// import getNoteTimeEachNote from '@utils/getTimeEachNote';

import PianoPartView from '@components/piano/PianoPartView';
import Header from '@components/practice/phone/Header';
// import Youtube from './YoutubeIframe';

EStyleSheet.build({ $rem: WIDTH / 380 });
const RATIO = HEIGHT / WIDTH;

// using in chord-table
let anim = new Animated.Value(0);
let currentXPosition = 0;
let frameXPosition = 0;
let moveCount = 0;

// using in play
let isLoading = false;
let isStart = false;
let firstStart = true;
let currentSecond = 0;
let startTimestamp = 0;
let stoppedTimestamp = 0;
let stopElapsedSecond = 0;

let leftNoteArrIdx = 0;
let rightNoteArrIdx = 0;
let playedLeftNoteKeys = [];
let playedRightNoteKeys = [];
let progress = 0;

let chordTableFirstExecuted = true;
let chordTableFirstMove = true;
// const moveDistance = 4;
const moveDistance = EStyleSheet.value(`30 * ${RATIO} * $rem `);

const ChordTableMode = ({ navigation, route: { params } }) => {
  const [youtubeStart, setYoutubeStart] = useState(false);
  const [touchedKey, setTouchedKey] = useState([]);
  const [nextKey, setNextKey] = useState([]);
  const [chordSync, setChordSync] = useState(0);
  const [pianoSync, setPianoSync] = useState(0);
  const scrollViewRef = useRef();
  const youtubeRef = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
    // start one time for youtube preloading
    setYoutubeStart(true);
  }, []);

  const {
    chord_arr: { notes },
    left_note_arr: leftNoteArr,
    right_note_arr: rightNoteArr,
  } = params;

  // const leftNoteTimeArr = getNoteTimeEachNote(left_note_arr.items);
  // const rightNoteTimeArr = getNoteTimeEachNote(right_note_arr.items);

  // using in sync control button
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
    transform: [{ translateX: anim }],
  };

  const start = () => {
    setYoutubeStart(true);
    // stoppedTime not equals zero means that it stopped before,
    // calculate time of stopped time
    if (stoppedTimestamp !== 0) {
      stopElapsedSecond = (Date.now() - stoppedTimestamp) / 1000;
      currentSecond -= stopElapsedSecond;
    }
  };

  const pause = () => {
    isStart = false;
    stoppedTimestamp = Date.now();
    setYoutubeStart(false);

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }
  };

  const backwardRewind = () => {
    // initialize related variables
    currentXPosition = 0;
    anim = new Animated.Value(0);
    frameXPosition = 0;
    moveCount = 0;

    firstStart = true;
    isStart = false;
    currentSecond = 0;
    startTimestamp = 0;
    stoppedTimestamp = 0;
    stopElapsedSecond = 0;

    leftNoteArrIdx = 0;
    rightNoteArrIdx = 0;
    playedLeftNoteKeys = [];
    playedRightNoteKeys = [];
    progress = 0;

    chordTableFirstExecuted = true;
    chordTableFirstMove = true;
    youtubeRef.current.seekTo(0);
    setYoutubeStart(false);
    scrollViewRef.current.scrollTo({ x: 0 });

    setNextKey([]);
    setTouchedKey([]);

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }
  };

  /**
   * Seeks to a specified time in the play
   * using in each chord-table box onPress props
   *
   * @param {Number} second second of note
   * @param {Number} index index of chord table box
   *
   * TODO: 시작 안 했을 때 누르면 시작하도록
   */

  const seekTo = (second = 0, index = 0) => {
    // chord table ScrollView scroll
    const sectionNumber = parseInt(index / 4, 10) - 1;

    currentXPosition = (moveDistance * 4 + 15) * sectionNumber;
    scrollViewRef.current.scrollTo({ x: currentXPosition });
    startTimestamp = Date.now();
    moveCount = index - 1;
    // move chord table focus
    frameXPosition = moveDistance * (index % 4);
    Animated.spring(anim, {
      toValue: frameXPosition,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // pause();
    // variable setting

    // sync note
    if (second > currentSecond) {
      while (second > rightNoteArr.items[rightNoteArrIdx].second) {
        rightNoteArrIdx += 1;
      }
      while (second > leftNoteArr.items[leftNoteArrIdx].second) {
        leftNoteArrIdx += 1;
      }
    } else {
      // startTimestamp += (second - currentSecond) * 1000; // TODO : FIX
      while (second < rightNoteArr.items[rightNoteArrIdx].second) {
        rightNoteArrIdx -= 1;
      }
      while (second < leftNoteArr.items[leftNoteArrIdx].second) {
        leftNoteArrIdx -= 1;
      }
    }

    // set time to touched point

    // TODO: 동영상의 길이를 받아와서 progress 계산에 적용
    progress = currentSecond / 283;

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }
    currentSecond = second;
    startTimestamp = Date.now();

    // youtube seek to
    youtubeRef.current.seekTo(second);
  };

  // TODO: 재생이 끝났을 때의 처리
  // using in GameLoop (call back that execute every 16ms)
  const updateHandler = () => {
    if (!isStart) return;
    if (chordTableFirstExecuted) {
      chordTableFirstExecuted = false;
      console.log('Engine START');
      // 시작 전 nextKey setting
      if (rightNoteArr.items[rightNoteArrIdx].key.length !== 0) {
        const tmpArr = [];
        rightNoteArr.items[rightNoteArrIdx].key.forEach((key) => {
          tmpArr.push(key.midiNum - 12);
        });
        setNextKey(tmpArr);
      }
    }

    const elapsedTime = Date.now() - startTimestamp;
    currentSecond += elapsedTime / 1000;
    startTimestamp = Date.now();
    // console.log('curTime :>> ', curTime);
    // TODO: 동영상의 길이를 받아와서 progress 계산에 적용
    // move progress bar
    progress = currentSecond / 283;

    // move chord table
    if (currentSecond >= notes[moveCount].second + chordSync) {
      if (chordTableFirstMove) {
        chordTableFirstMove = false;
        moveCount += 1;
      } else {
        frameXPosition += moveDistance;
        moveCount += 1;
        if (moveCount !== 1 && moveCount % 4 === 1) {
          frameXPosition = 0;
          currentXPosition += moveDistance * 4 + 15;
          scrollViewRef.current.scrollTo({ x: currentXPosition });
        }
        Animated.spring(anim, {
          toValue: frameXPosition,
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

    // //play chord of left note
    if (currentSecond >= leftNoteArr.items[leftNoteArrIdx].second + pianoSync) {
      if (leftNoteArr.items[leftNoteArrIdx].key.length !== 0) {
        if (leftNoteArr.items[leftNoteArrIdx].key[0].noteOn === 1) {
          leftNoteArr.items[leftNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
          });
          playedLeftNoteKeys = leftNoteArr.items[leftNoteArrIdx].key;
        }
      } else {
        playedLeftNoteKeys.forEach((key) => {
          PianoSampler.stopNote(key.midiNum);
        });
        playedLeftNoteKeys = [];
      }
      leftNoteArrIdx += 1;
    }

    // play chord of right note
    if (currentSecond >= rightNoteArr.items[rightNoteArrIdx].second + pianoSync) {
      if (rightNoteArr.items[rightNoteArrIdx].key.length !== 0) {
        if (rightNoteArr.items[rightNoteArrIdx].key[0].noteOn === 1) {
          const tmpArr = [];
          rightNoteArr.items[rightNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
            tmpArr.push(key.midiNum - 12);
          });
          setTouchedKey(tmpArr);
          // set next key TODO: 배열 범위 넘어갔을 때 분기
          for (let i = 1; i < 100; i += 1) {
            if (rightNoteArr.items[rightNoteArrIdx + i].key.length !== 0) {
              if (rightNoteArr.items[rightNoteArrIdx + i].key[0].noteOn === 1) {
                const tmpArr2 = [];
                rightNoteArr.items[rightNoteArrIdx + i].key.forEach((key) => {
                  tmpArr2.push(key.midiNum - 12);
                });
                setNextKey(tmpArr2);
                break;
              }
            }
          }
          playedRightNoteKeys = rightNoteArr.items[rightNoteArrIdx].key;
        }
      } else {
        // N chord
        setTouchedKey([]);
        playedRightNoteKeys.forEach((key) => {
          PianoSampler.stopNote(key.midiNum);
        });
        playedRightNoteKeys = [];
      }
      rightNoteArrIdx += 1;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <GameLoop onUpdate={updateHandler}>
        <Header navigation={navigation} title={params.meta.songName} progress={progress} />

        <View style={[styles.bodyContainer, { alignItems: 'center' }]}>
          <TouchableOpacity onPress={null} style={{ flex: 1 }}>
            <View style={styles.toggleBtnView}>
              <Text style={styles.toggleBtnText}>CHORD</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.syncView}>
              <Text style={styles.buttonTitleText}>CHORD</Text>
              <SimpleLineIcons
                style={[styles.buttonIconSmall, youtubeStart && { color: colors.grey30Dimmed2 }]}
                name="arrow-left"
                onPress={youtubeStart ? null : minusChordSync}
              />
              <Text
                style={[styles.syncNumberText, youtubeStart && { color: colors.grey30Dimmed2 }]}
              >
                {chordSync.toFixed(2)}
              </Text>
              <SimpleLineIcons
                style={[styles.buttonIconSmall, youtubeStart && { color: colors.grey30Dimmed2 }]}
                name="arrow-right"
                onPress={youtubeStart ? null : plusChordSync}
              />
            </View>
            {/* sync control button */}
            <View style={styles.syncView}>
              <Text style={styles.buttonTitleText}>PIANO</Text>
              <SimpleLineIcons
                style={[styles.buttonIconSmall, youtubeStart && { color: colors.grey30Dimmed2 }]}
                name="arrow-left"
                onPress={youtubeStart ? null : minusPianoSync}
              />
              <Text
                style={[styles.syncNumberText, youtubeStart && { color: colors.grey30Dimmed2 }]}
              >
                {pianoSync.toFixed(2)}
              </Text>
              <SimpleLineIcons
                style={[styles.buttonIconSmall, youtubeStart && { color: colors.grey30Dimmed2 }]}
                name="arrow-right"
                onPress={youtubeStart ? null : plusPianoSync}
              />
            </View>

            <TouchableOpacity onPress={backwardRewind}>
              <Feather style={styles.buttonIconLarge} name="skip-back" />
            </TouchableOpacity>
            {isStart ? (
              <TouchableOpacity onPress={pause}>
                <Feather style={styles.buttonIconLarge} name="pause" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={start}>
                <Feather style={styles.buttonIconLarge} name="play" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.bodyContainer}>
          {/* using in chord-table focusing */}
          <Animated.View style={[styles.focusFrame, animationStyles]} />
          {/* render each chord table box in notes  */}
          <ScrollView horizontal ref={scrollViewRef}>
            {notes.map(({ name, second }, index) => {
              if (index % 4 === 3) {
                return (
                  <>
                    <View style={styles.chordTableBoxFrame}>
                      {/* FIXME: is this anti pattern..? */}
                      <TouchableOpacity onPress={() => seekTo(second, index)}>
                        <View style={styles.chordTableBox}>
                          <Text style={styles.chordTableText}>{name}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                  </>
                );
              }
              return (
                <>
                  <View style={styles.chordTableBoxFrame}>
                    <TouchableOpacity onPress={() => seekTo(second, index)}>
                      <View style={styles.chordTableBox}>
                        <Text style={styles.chordTableText}>{name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.footContainer}>
          <View style={styles.footSub1}>
            <View style={{ width: '100%', height: '100%' }}>
              <PianoPartView firstKey="f2" touchedKey={touchedKey} nextKey={nextKey} />
            </View>
          </View>
          <View style={styles.footSub2}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2, backgroundColor: 'purple' }}>
              <Youtube
                apiKey="AIzaSyCQ-t9tVNIlNhN4jKlAHsNmYoaMs7IuyWE" // For using Youtube API in Android
                ref={youtubeRef}
                videoId={params.meta.link} // The YouTube video ID
                origin="http://www.youtube.com"
                play={youtubeStart} // control playback of video with true/false
                onReady={(e) => console.log(e)}
                onChangeState={(e) => {
                  if (e.state === 'playing') {
                    // youtube preloading
                    if (!isLoading) {
                      isLoading = true;
                      setYoutubeStart(false);
                      youtubeRef.current.seekTo(0);
                      return;
                    }
                    isStart = true;
                    if (firstStart) {
                      startTimestamp = Date.now();
                      firstStart = false;
                      console.log('START');
                    }
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
    ...ifIphoneX({ paddingHorizontal: 60 }, { paddingHorizontal: 30 }),
  },
  footContainer: {
    flex: 1.3,
    flexDirection: 'row',
    backgroundColor: '#0d0d0d',
    paddingBottom: 20,
    ...ifIphoneX({ paddingHorizontal: 60 }, { paddingHorizontal: 30 }),
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

  // chord table
  focusFrame: {
    position: 'absolute',
    width: `28rem * ${RATIO}`,
    height: `28rem * ${RATIO}`,
    borderWidth: 2,
    borderColor: 'rgb(85,60,230)',
    borderRadius: 7,
    zIndex: 1,
    top: 10,
    ...ifIphoneX({ left: 60 }, { left: 30 }),
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
    fontSize: `12rem * ${RATIO}`,
    fontWeight: '600',
  },
  divider: {
    width: 15,
    height: `40rem * ${RATIO}`,
    backgroundColor: 'rgb(0,0,0)',
  },

  // youtube
  youtube: {
    flex: 1,
  },
});
