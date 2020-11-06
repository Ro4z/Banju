/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Animated, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { GameLoop } from 'react-native-game-engine';
import PianoSampler from 'react-native-piano-sampler';
import Youtube from '@ro4z/react-native-youtube';
import { useBluetoothHeadsetDetection } from 'react-native-bluetooth-headset-detect';

import Feather from '@assets/icon/Feather';
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';
import { BACKGROUND_COLOR, colors } from '@constants/color';
import { WIDTH, HEIGHT } from '@constants/dimensions';
import secondToString from '@utils/secondToString';

import PianoPartView from '@components/piano/PianoPartView';
import Header from '@components/practice/phone/Header';

EStyleSheet.build({ $rem: WIDTH / 380 });
const RATIO = HEIGHT / WIDTH;

let startTimestamp = 0;
let youtubeDuration = 0;

let chordTableFirstExecuted = true;
let chordTableFirstMove = true;

// let leftPlayedKey = [];

const moveDistance = EStyleSheet.value(`30 * ${RATIO} * $rem `);

const ChordTableMode = ({ navigation, route: { params } }) => {
  const [youtubeStart, setYoutubeStart] = useState(false);
  const [touchedKey, setTouchedKey] = useState([]);
  const [nextKey, setNextKey] = useState([]);
  const [playSync, setPlaySync] = useState(0);
  const [volume, setVolume] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const bluetoothHeadset = useBluetoothHeadsetDetection();

  const scrollViewRef = useRef();
  const youtubeRef = useRef();

  const animationValue = useRef(new Animated.Value(0));
  const frameXPosition = useRef(0);
  const currentSecond = useRef(0);
  const currentSecondInteger = useRef(0);
  const isYoutubeLoading = useRef(false);
  const isPlayStart = useRef(false);

  const leftNoteArrIdx = useRef(0);
  const rightNoteArrIdx = useRef(0);
  const progress = useRef(0);
  const moveCount = useRef(0);
  const timeoutValue = useRef(0);
  const moveChordTable = useRef(true);

  const leftPlayedKey = useRef([]);
  const rightPlayedKey = useRef([]);

  useEffect(() => {
    if (!bluetoothHeadset) {
      setPlaySync(0.25);
      console.log('no headset');
    } else {
      setPlaySync(0);
      console.log('connect headset');
    }
  }, [bluetoothHeadset]);

  useEffect(() => {
    Orientation.lockToLandscape();
    // start one time for youtube preloading
    PianoSampler.prepare();
    setYoutubeStart(true);
    return () => {
      // stop all note
      for (let i = 21; i <= 108; i += 1) {
        PianoSampler.stopNote(i);
      }
    };
  }, []);

  const {
    chord_arr: { notes },
    left_note_arr: leftNoteArr,
    right_note_arr: rightNoteArr,
  } = params;

  const animationStyles = {
    transform: [{ translateX: animationValue.current }],
  };

  // using in volume, sync control button
  const minusVolume = useCallback(() => {
    if (volume === 0) return;
    setVolume(volume - 1);
    PianoSampler.setVolume((volume - 1) / 10);
  }, [volume]);

  const plusVolume = useCallback(() => {
    if (volume === 10) return;
    setVolume(volume + 1);
    PianoSampler.setVolume((volume + 1) / 10);
  }, [volume]);

  const minusPlaySync = useCallback(() => {
    if (playSync === -5) return;
    setPlaySync(playSync - 0.05);
  }, [playSync]);

  const plusPlaySync = useCallback(() => {
    if (playSync === 5) return;
    setPlaySync(playSync + 0.05);
  }, [playSync]);

  // control play
  const start = useCallback(() => {
    setYoutubeStart(true);
  }, []);

  const pause = useCallback(() => {
    isPlayStart.current = false;
    setYoutubeStart(false);

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }
  }, []);

  const backwardRewind = useCallback(() => {
    // initialize related variables
    currentXPosition = 0;
    animationValue.current = new Animated.Value(0);
    frameXPosition.current = 0;
    moveCount.current = 0;

    isPlayStart.current = false;
    currentSecond.current = 0;
    currentSecondInteger.current = 0;
    startTimestamp = 0;

    leftNoteArrIdx.current = 0;
    rightNoteArrIdx.current = 0;
    progress.current = 0;

    chordTableFirstExecuted = true;
    chordTableFirstMove = true;
    youtubeRef.current.seekTo(0);
    setYoutubeStart(false);
    scrollViewRef.current.scrollToIndex({ index: 0 });

    setNextKey([]);
    setTouchedKey([]);

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }
  }, []);

  /**
   * Seeks to a specified time in the play
   * using in each chord-table box onPress props
   *
   * @param {Number} second second of note
   * @param {Number} index index of chord table box
   *
   * TODO: 시작 안 했을 때 누르면 시작하도록
   */
  const seekTo = useCallback((second = 0, index = 0) => {
    // chord table ScrollView scroll
    const sectionNumber = parseInt(index / 4, 10) - 1;
    currentXPosition = (moveDistance * 4 + 15) * sectionNumber;
    scrollViewRef.current.scrollToIndex({ index });

    // move chord table focus
    frameXPosition.current = moveDistance * (index % 4);
    moveChordTable.current = true;
    // Animated.spring(anim, {
    //   toValue: frameXPosition,
    //   duration: 250,
    //   useNativeDriver: true,
    // }).start();

    // sync with chord table
    moveCount.current = index;

    // sync with note array
    if (second > currentSecond.current) {
      while (second > rightNoteArr.items[rightNoteArrIdx.current].second) {
        rightNoteArrIdx.current += 1;
      }
      while (second > leftNoteArr.items[leftNoteArrIdx.current].second) {
        leftNoteArrIdx.current += 1;
      }
    } else {
      while (second < rightNoteArr.items[rightNoteArrIdx.current].second) {
        rightNoteArrIdx.current -= 1;
      }
      while (second < leftNoteArr.items[leftNoteArrIdx.current].second) {
        leftNoteArrIdx.current -= 1;
      }
    }

    // set time to touched point
    currentSecond.current = second;
    startTimestamp = Date.now();

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }

    // youtube seek to
    youtubeRef.current.seekTo(second);
  }, []);

  // using in GameLoop (call back that execute every 16ms)
  const updateHandler = useCallback(() => {
    if (!isPlayStart.current) return;

    const ST = Date.now();

    currentSecond.current += (ST - startTimestamp) / 1000;
    startTimestamp = ST;

    // end event
    if (currentSecond.current > youtubeDuration) backwardRewind();

    if (chordTableFirstExecuted) {
      chordTableFirstExecuted = false;

      // 시작 전 nextKey setting
      for (let i = 1; i < 50; i += 1) {
        if (rightNoteArr.items[rightNoteArrIdx.current + i].key.length !== 0) {
          if (rightNoteArr.items[rightNoteArrIdx.current + i].key[0].noteOn === 1) {
            const tmpArr2 = [];
            rightNoteArr.items[rightNoteArrIdx.current + i].key.forEach((key) => {
              tmpArr2.push(key.midiNum);
            });
            setNextKey(tmpArr2);
            break;
          }
        }
      }
    }

    // move progress bar
    progress.current = currentSecond.current / youtubeDuration;

    // move chord table
    if (moveCount.current < notes.length) {
      if (currentSecond.current >= notes[moveCount.current].second + playSync) {
        currentSecondInteger.current = parseInt(currentSecond.current, 10);
        if (chordTableFirstMove) {
          chordTableFirstMove = false;
          // moveCount.current += 1;
        } else {
          // frameXPosition.current += moveDistance / 4;
          moveCount.current += 1;
          if (moveCount.current !== 1 && moveCount.current % 4 === 1) {
            // frameXPosition.current = 0;
          }

          // Animated.spring(animationValue.current, {
          //   toValue: frameXPosition.current,
          //   duration: 250,
          //   useNativeDriver: true,
          // }).start();
        }
        if (moveChordTable.current) {
          if (moveCount.current < notes.length) {
            scrollViewRef.current.scrollToIndex({ index: moveCount.current });
          }
        }
      }
    }

    if (rightNoteArrIdx.current < rightNoteArr.items.length) {
      // play chord in right note
      if (currentSecond.current >= rightNoteArr.items[rightNoteArrIdx.current].second + playSync) {
        if (rightNoteArr.items[rightNoteArrIdx.current].key.length !== 0) {
          if (rightNoteArr.items[rightNoteArrIdx.current].key[0].noteOn === 1) {
            rightPlayedKey.current.forEach((key) => {
              PianoSampler.stopNote(key.midiNum);
            });
            const tmpArr = [];
            rightNoteArr.items[rightNoteArrIdx.current].key.forEach((key) => {
              PianoSampler.playNote(key.midiNum, 115);
              tmpArr.push(key.midiNum);
            });
            rightPlayedKey.current = rightNoteArr.items[rightNoteArrIdx.current].key;
            // show touched key in PianoPartView
            setTouchedKey(tmpArr);

            for (
              let i = 1;
              i < 50 && rightNoteArrIdx.current + i < rightNoteArr.items.length;
              i += 1
            ) {
              if (rightNoteArr.items[rightNoteArrIdx.current + i].key.length !== 0) {
                if (rightNoteArr.items[rightNoteArrIdx.current + i].key[0].noteOn === 1) {
                  const tmpArr2 = [];
                  rightNoteArr.items[rightNoteArrIdx.current + i].key.forEach((key) => {
                    tmpArr2.push(key.midiNum);
                  });
                  // show next key in PianoPartView
                  setNextKey(tmpArr2);
                  break;
                }
              }
            }
          }
        } else {
          // N chord
          // FIXME: is cause performance degradation?
          // setTouchedKey([]);
        }
        rightNoteArrIdx.current += 1;
      }
    }

    // play chord in left note
    if (leftNoteArrIdx.current < leftNoteArr.items.length) {
      if (currentSecond.current >= leftNoteArr.items[leftNoteArrIdx.current].second + playSync) {
        if (leftNoteArr.items[leftNoteArrIdx.current].key.length !== 0) {
          if (leftNoteArr.items[leftNoteArrIdx.current].key[0].noteOn === 1) {
            leftPlayedKey.current.forEach((key) => {
              PianoSampler.stopNote(key.midiNum);
            });
            leftNoteArr.items[leftNoteArrIdx.current].key.forEach((key) => {
              PianoSampler.playNote(key.midiNum, 115);
            });
            leftPlayedKey.current = leftNoteArr.items[leftNoteArrIdx.current].key;
          }
        }
        leftNoteArrIdx.current += 1;
      }
    }

    // const FT = Date.now();
    // console.log('execute time', FT - ST);
  }, [playSync]);

  return (
    <View style={styles.mainContainer}>
      <GameLoop onUpdate={updateHandler}>
        {React.useMemo(() => {
          return (
            <Header
              navigation={navigation}
              title={params.meta.songName}
              progress={progress.current}
              params={params}
            />
          );
        }, [params, progress.current])}

        <View style={[styles.bodyContainer, { alignItems: 'center' }]}>
          {React.useMemo(() => {
            return (
              <View onPress={null} style={{ flex: 1 }}>
                <View style={styles.toggleBtnView}>
                  <Text style={styles.toggleBtnText}>CHORD</Text>
                </View>
              </View>
            );
          }, [])}

          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {React.useMemo(() => {
              return (
                <>
                  <View style={styles.syncView}>
                    {/* <Text style={styles.buttonTitleText}>CHORD</Text> */}
                    <SimpleLineIcons
                      style={[styles.buttonTitleText, { fontSize: 25 }]}
                      name="volume-2"
                    />
                    <SimpleLineIcons
                      style={[
                        styles.buttonIconSmall,
                        youtubeStart && { color: colors.grey30Dimmed2 },
                      ]}
                      name="arrow-left"
                      onPress={minusVolume}
                    />
                    <Text
                      style={[
                        styles.syncNumberText,
                        youtubeStart && { color: colors.grey30Dimmed2 },
                      ]}
                    >
                      {volume}
                    </Text>
                    <SimpleLineIcons
                      style={[
                        styles.buttonIconSmall,
                        youtubeStart && { color: colors.grey30Dimmed2 },
                      ]}
                      name="arrow-right"
                      onPress={plusVolume}
                    />
                    {/* sync control button */}
                    <View style={styles.syncView}>
                      <Text style={styles.buttonTitleText}>SYNC</Text>
                      <SimpleLineIcons
                        style={[
                          styles.buttonIconSmall,
                          youtubeStart && { color: colors.grey30Dimmed2 },
                        ]}
                        name="arrow-left"
                        onPress={youtubeStart ? null : minusPlaySync}
                      />
                      <Text
                        style={[
                          styles.syncNumberText,
                          youtubeStart && { color: colors.grey30Dimmed2 },
                        ]}
                      >
                        {playSync.toFixed(2)}
                      </Text>
                      <SimpleLineIcons
                        style={[
                          styles.buttonIconSmall,
                          youtubeStart && { color: colors.grey30Dimmed2 },
                        ]}
                        name="arrow-right"
                        onPress={youtubeStart ? null : plusPlaySync}
                      />
                    </View>
                  </View>
                  <TouchableOpacity onPress={backwardRewind}>
                    <Feather style={styles.buttonIconLarge} name="skip-back" />
                  </TouchableOpacity>
                </>
              );
            }, [youtubeStart, volume, playSync])}

            {React.useMemo(() => {
              return (
                <Text style={styles.syncNumberText}>{secondToString(currentSecond.current)}</Text>
              );
            }, [currentSecondInteger.current])}

            {React.useMemo(() => {
              return isPlayStart.current ? (
                <TouchableOpacity onPress={pause}>
                  <Feather style={styles.buttonIconLarge} name="pause" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={youtubeStart ? null : start}>
                  <Feather
                    style={[
                      styles.buttonIconLarge,
                      youtubeStart && { color: colors.grey30Dimmed2 },
                    ]}
                    name="play"
                  />
                </TouchableOpacity>
              );
            }, [youtubeStart, isPlayStart.current])}
          </View>
        </View>

        <View style={styles.bodyContainer}>
          {/* using in chord-table focusing */}
          <Animated.View style={[styles.focusFrame, animationStyles]} />
          {/* render each chord table box in notes  */}
          {React.useMemo(() => {
            console.log('SCROLL VIEW RENDER');
            return (
              <FlatList
                data={notes}
                horizontal
                ref={scrollViewRef}
                onTouchStart={() => {
                  clearTimeout(timeoutValue.current);
                  moveChordTable.current = false;
                  timeoutValue.current = setTimeout(() => {
                    moveChordTable.current = true;
                  }, 2000);
                }}
                keyExtractor={(item) => item.name + item.second}
                ListFooterComponent={<View style={styles.emptyBox} />}
                renderItem={({ item, index }) => {
                  if (index % 4 === 3) {
                    return (
                      <>
                        <View style={styles.chordTableBoxFrame}>
                          {/* FIXME: is this anti pattern..? how to */}
                          <TouchableOpacity onPress={() => seekTo(item.second - 0.7, index)}>
                            <View style={styles.chordTableBox}>
                              <Text style={styles.chordTableText}>{item.name}</Text>
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
                        <TouchableOpacity onPress={() => seekTo(item.second - 0.7, index)}>
                          <View style={styles.chordTableBox}>
                            <Text style={styles.chordTableText}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }}
              />
            );
          }, [notes])}
        </View>

        <View style={styles.footContainer}>
          <View style={styles.footSub1}>
            {React.useMemo(() => {
              return (
                <View style={{ width: '100%', height: '100%' }}>
                  <PianoPartView firstKey="f3" touchedKey={touchedKey} nextKey={nextKey} />
                </View>
              );
            }, [touchedKey, nextKey])}
          </View>
          <View style={styles.footSub2}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2, backgroundColor: 'purple' }}>
              {React.useMemo(() => {
                return (
                  <Youtube
                    apiKey="AIzaSyCQ-t9tVNIlNhN4jKlAHsNmYoaMs7IuyWE" // For using Youtube API in Android
                    ref={youtubeRef}
                    videoId={params.meta.link} // The YouTube video ID
                    origin="http://www.youtube.com"
                    play={youtubeStart} // control playback of video with true/false
                    onReady={(e) => console.log(e)}
                    onChangeState={async (e) => {
                      if (e.state === 'playing') {
                        // youtube preloading
                        if (!isYoutubeLoading.current) {
                          isYoutubeLoading.current = true;

                          setYoutubeStart(false);
                          youtubeRef.current.seekTo(0);
                          youtubeDuration = await youtubeRef.current.getDuration();
                          return;
                        }
                        // currentSecond = await youtubeRef.current.getCurrentTime();
                        startTimestamp = Date.now();
                        isPlayStart.current = true;
                      }
                    }}
                    // onChangeQuality={(e) => console.log(e)}
                    // onError={(e) => console.log(e)}
                    style={styles.youtube}
                    controls={0}
                  />
                );
              }, [params, youtubeStart])}
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
    fontSize: '35rem',
  },
  buttonIconSmall: {
    color: colors.neonText2,
    fontSize: '27rem',
  },
  buttonTitleText: {
    fontFamily: 'OpenSauceSans-Black',
    fontSize: '18rem',
    color: colors.grey152,
    marginRight: 5,
    marginLeft: 8,
  },
  syncView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncNumberText: {
    fontFamily: 'OpenSauceSans-Light',
    fontSize: '16rem',
    color: colors.grey952,
    marginHorizontal: 7,
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
  emptyBox: {
    width: `30rem * ${RATIO * 12}`,
    height: `30rem * ${RATIO}`,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },

  // youtube
  youtube: {
    flex: 1,
  },
});
