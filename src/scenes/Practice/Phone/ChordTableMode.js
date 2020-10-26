/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { GameLoop } from 'react-native-game-engine';
import PianoSampler from 'react-native-piano-sampler';
import Youtube from '@ro4z/react-native-youtube';

import Feather from '@assets/icon/Feather';
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';
import { BACKGROUND_COLOR, colors } from '@constants/color';
import { WIDTH, HEIGHT } from '@constants/dimensions';
import secondToString from '@utils/secondToString';

import PianoPartView from '@components/piano/PianoPartView';
import Header from '@components/practice/phone/Header';

EStyleSheet.build({ $rem: WIDTH / 380 });
const RATIO = HEIGHT / WIDTH;

// using in chord-table
let anim = new Animated.Value(0);
let currentXPosition = 0;
let frameXPosition = 0;
let moveCount = 0;

// using in play
let isYoutubeLoading = false;
let isPlayStart = false;
let currentSecond = 0;
let currentSecondInteger = 0;
let startTimestamp = 0;
let youtubeDuration = 0;

let leftNoteArrIdx = 0;
let rightNoteArrIdx = 0;
let progress = 0;

let chordTableFirstExecuted = true;
let chordTableFirstMove = true;

const moveDistance = EStyleSheet.value(`30 * ${RATIO} * $rem `);

const ChordTableMode = ({ navigation, route: { params } }) => {
  const [youtubeStart, setYoutubeStart] = useState(false);
  const [touchedKey, setTouchedKey] = useState([]);
  const [nextKey, setNextKey] = useState([]);
  const [playSync, setPlaySync] = useState(0);
  const [volume, setVolume] = useState(5);

  const scrollViewRef = useRef();
  const youtubeRef = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
    // start one time for youtube preloading
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
    transform: [{ translateX: anim }],
  };

  // using in volume, sync control button
  const minusVolume = () => {
    if (volume === 0) return;
    setVolume(volume - 1);
    PianoSampler.setVolume((volume - 1) / 10);
  };
  const plusVolume = () => {
    if (volume === 10) return;
    setVolume(volume + 1);
    PianoSampler.setVolume((volume + 1) / 10);
  };

  // TODO: sync 제한 추가
  const minusPlaySync = () => {
    setPlaySync(playSync - 0.05);
  };

  const plusPlaySync = () => {
    setPlaySync(playSync + 0.05);
  };

  // control play
  const start = async () => {
    setYoutubeStart(true);
  };

  const pause = async () => {
    isPlayStart = false;
    setYoutubeStart(false);

    // const tmp = await getTime();
    // stoppedSecond = parseInt(tmp / 1000000, 10) / 1000;

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

    isPlayStart = false;
    currentSecond = 0;
    currentSecondInteger = 0;
    startTimestamp = 0;

    leftNoteArrIdx = 0;
    rightNoteArrIdx = 0;
    progress = 0;

    chordTableFirstExecuted = true;
    chordTableFirstMove = true;
    youtubeRef.current.seekTo(0);
    currentSecond = 0;
    setYoutubeStart(false);
    scrollViewRef.current.scrollToIndex({ index: 0 });

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
    scrollViewRef.current.scrollToIndex({ index });

    // move chord table focus
    frameXPosition = moveDistance * (index % 4);
    // Animated.spring(anim, {
    //   toValue: frameXPosition,
    //   duration: 250,
    //   useNativeDriver: true,
    // }).start();

    // sync with chord table
    moveCount = index;

    // sync with note array
    if (second > currentSecond) {
      while (second > rightNoteArr.items[rightNoteArrIdx].second) {
        rightNoteArrIdx += 1;
      }
      while (second > leftNoteArr.items[leftNoteArrIdx].second) {
        leftNoteArrIdx += 1;
      }
    } else {
      while (second < rightNoteArr.items[rightNoteArrIdx].second) {
        rightNoteArrIdx -= 1;
      }
      while (second < leftNoteArr.items[leftNoteArrIdx].second) {
        leftNoteArrIdx -= 1;
      }
    }

    // set time to touched point
    currentSecond = second;
    startTimestamp = Date.now();

    // stop all note
    for (let i = 21; i <= 108; i += 1) {
      PianoSampler.stopNote(i);
    }

    // youtube seek to
    youtubeRef.current.seekTo(second);
  };

  // TODO: 재생이 끝났을 때의 처리
  // using in GameLoop (call back that execute every 16ms)
  const updateHandler = async () => {
    if (!isPlayStart) return;

    const ST = Date.now();

    currentSecond += (ST - startTimestamp) / 1000;
    startTimestamp = ST;

    if (chordTableFirstExecuted) {
      chordTableFirstExecuted = false;

      // 시작 전 nextKey setting
      for (let i = 1; i < 50; i += 1) {
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
    }

    // move progress bar
    progress = currentSecond / youtubeDuration;

    // end event
    if (currentSecond > youtubeDuration) pause();

    // TODO: focus frame의 작동 방식을 setting에서 정하도록
    // move chord table
    if (currentSecond >= notes[moveCount].second + playSync) {
      currentSecondInteger = parseInt(currentSecond, 10);
      if (chordTableFirstMove) {
        chordTableFirstMove = false;
        // moveCount += 1;
      } else {
        frameXPosition += moveDistance;
        moveCount += 1;
        if (moveCount !== 1 && moveCount % 4 === 1) {
          frameXPosition = 0;
          currentXPosition += 15;
          // scrollViewRef.current.scrollTo({ x: currentXPosition });
        }
        // Animated.spring(anim, {
        //   toValue: frameXPosition,
        //   duration: 250,
        //   useNativeDriver: true,
        // }).start();
        currentXPosition += moveDistance;
      }
      scrollViewRef.current.scrollToIndex({ index: moveCount });
    }

    // play chord in right note
    if (currentSecond >= rightNoteArr.items[rightNoteArrIdx].second + playSync) {
      if (rightNoteArr.items[rightNoteArrIdx].key.length !== 0) {
        if (rightNoteArr.items[rightNoteArrIdx].key[0].noteOn === 1) {
          const tmpArr = [];
          rightNoteArr.items[rightNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
            tmpArr.push(key.midiNum - 12);
          });
          // show touched key in PianoPartView
          setTouchedKey(tmpArr);

          for (let i = 1; i < 50 && i < rightNoteArr.items.length; i += 1) {
            if (rightNoteArr.items[rightNoteArrIdx + i].key.length !== 0) {
              if (rightNoteArr.items[rightNoteArrIdx + i].key[0].noteOn === 1) {
                const tmpArr2 = [];
                rightNoteArr.items[rightNoteArrIdx + i].key.forEach((key) => {
                  tmpArr2.push(key.midiNum - 12);
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
      rightNoteArrIdx += 1;
    }

    // play chord in left note
    if (currentSecond >= leftNoteArr.items[leftNoteArrIdx].second + playSync) {
      if (leftNoteArr.items[leftNoteArrIdx].key.length !== 0) {
        if (leftNoteArr.items[leftNoteArrIdx].key[0].noteOn === 1) {
          leftNoteArr.items[leftNoteArrIdx].key.forEach((key) => {
            PianoSampler.playNote(key.midiNum, 115);
          });
        }
      }
      leftNoteArrIdx += 1;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <GameLoop onUpdate={updateHandler}>
        {React.useMemo(() => {
          return (
            <Header navigation={navigation} title={params.meta.songName} progress={progress} />
          );
        }, [params, progress])}

        <View style={[styles.bodyContainer, { alignItems: 'center' }]}>
          {React.useMemo(() => {
            return (
              <TouchableOpacity onPress={null} style={{ flex: 1 }}>
                <View style={styles.toggleBtnView}>
                  <Text style={styles.toggleBtnText}>CHORD</Text>
                </View>
              </TouchableOpacity>
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
              return <Text style={styles.syncNumberText}>{secondToString(currentSecond)}</Text>;
            }, [currentSecondInteger])}

            {React.useMemo(() => {
              return isPlayStart ? (
                <TouchableOpacity onPress={pause}>
                  <Feather style={styles.buttonIconLarge} name="pause" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={start}>
                  <Feather style={styles.buttonIconLarge} name="play" />
                </TouchableOpacity>
              );
            }, [isPlayStart])}
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
                keyExtractor={(item) => item.name + item.second}
                renderItem={({ item, index }) => {
                  if (index % 4 === 3) {
                    return (
                      <>
                        <View style={styles.chordTableBoxFrame}>
                          {/* FIXME: is this anti pattern..? how to */}
                          <TouchableOpacity onPress={() => seekTo(item.second, index)}>
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
                        <TouchableOpacity onPress={() => seekTo(item.second, index)}>
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
                  <PianoPartView firstKey="f2" touchedKey={touchedKey} nextKey={nextKey} />
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
                        if (!isYoutubeLoading) {
                          isYoutubeLoading = true;
                          setYoutubeStart(false);
                          youtubeRef.current.seekTo(0);
                          youtubeDuration = await youtubeRef.current.getDuration();
                          return;
                        }
                        // currentSecond = await youtubeRef.current.getCurrentTime();
                        startTimestamp = Date.now();
                        isPlayStart = true;
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
    fontSize: 35,
  },
  buttonIconSmall: {
    color: colors.neonText2,
    fontSize: 27,
  },
  buttonTitleText: {
    fontFamily: 'OpenSauceSans-Black',
    fontSize: 18,
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
    fontSize: 18,
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

  // youtube
  youtube: {
    flex: 1,
  },
});
