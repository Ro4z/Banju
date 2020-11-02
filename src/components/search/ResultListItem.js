/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import AnimateNumber from 'react-native-animate-number';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedEllipsis from '@ro4z/react-native-animated-ellipsis';
import axios from 'axios';
import he from 'he';

import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import { colors } from '@constants/color';
import truncateString from '@utils/truncateString';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const ResultListItem = ({ data, isReady, navigation }) => {
  const [openModal, setOpenModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isChording, setIsChording] = useState(false);
  const [animateToNumber, setAnimateToNumber] = useState(0);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const saveHistory = async (id, title, thumbnail) => {
    console.log(title, thumbnail);
    let historyJSON = JSON.parse(await AsyncStorage.getItem('Practice:history'));
    if (!historyJSON) historyJSON = {};
    historyJSON[id] = {
      id,
      title,
      thumbnail,
      playTime: Date.now(),
    };

    AsyncStorage.setItem('Practice:history', JSON.stringify(historyJSON));
  };

  const pollingGetPlayMeta = (link) => {
    if (typeof link === 'undefined') return;
    setIsChording(true);
    const pollingObj = setInterval(() => {
      axios
        .get(Base.GET_PLAYMETA + link, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZjhiMzcwLTEyYzItMTFlYi04M2QzLTNiZGFjOGY1NDUyNSIsImF1dGgiOiJodHRwOi8vYXBpLmRhaWx5YmFuanUuY29tIiwiaWF0IjoxNjA0MTUwOTc5fQ.r_zgjb68ciErFF-JGdhOiqrdTUQ1uBgsuV7evycvstw`,
          },
        })
        // status: "error" | "working" | "finished"
        .then(({ data, data: { status } }) => {
          if (status === 'working') {
            if (typeof data.content === 'undefined') return;
            setAnimateToNumber(data.content.progress);
          } else if (status === 'finished') {
            clearInterval(pollingObj);
            setOpenModal(false);
            setIsChording(false);
            const {
              content: { items, meta },
            } = data;
            navigation.navigate('Practice', {
              chord_arr: items.chord,
              left_note_arr: items.noteLeft,
              right_note_arr: items.noteRight,
              meta,
            });
          } else {
            // TODO: sentry 연결
            clearInterval(pollingObj);
            setIsChording(false);
            Alert.alert('오류가 발생하였습니다.');
          }
        })
        .catch((err) => {
          clearInterval(pollingObj);
          setIsChording(false);
          Alert.alert('오류가 발생하였습니다.');
        });
    }, 1000);
  };

  const getPlaymeta = (link) => {
    if (typeof link === 'undefined') return;
    setShowLoading(true);
    axios
      .get(Base.GET_PLAYMETA + link, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZjhiMzcwLTEyYzItMTFlYi04M2QzLTNiZGFjOGY1NDUyNSIsImF1dGgiOiJodHRwOi8vYXBpLmRhaWx5YmFuanUuY29tIiwiaWF0IjoxNjA0MTUwOTc5fQ.r_zgjb68ciErFF-JGdhOiqrdTUQ1uBgsuV7evycvstw`,
        },
      })
      // status: "error" | "working" | "finished"
      .then(({ data, data: { status } }) => {
        if (status === 'finished') {
          setOpenModal(false);
          const {
            content: { items, meta },
          } = data;
          navigation.navigate('Practice', {
            chord_arr: items.chord,
            left_note_arr: items.noteLeft,
            right_note_arr: items.noteRight,
            meta,
          });
        } else {
          console.log('error!', status);
          Alert.alert('오류가 발생하였습니다.');
        }
      })
      .catch((err) => {
        console.log('axios error', err);
        Alert.alert('오류가 발생하였습니다.');
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  return (
    <>
      <Spinner visible={showLoading} />
      <TouchableOpacity style={styles.mainContainer} onPress={toggleModal}>
        <View style={styles.header}>
          {/* TODO: replace with image */}
          {data.convert === 'Banjued' && (
            <Image source={require('@assets/img/ready.png')} style={styles.ready} />
          )}
          <View style={styles.thumbnailImageView}>
            <Image style={styles.thumbnailImage} source={{ uri: data.thumbnail.url }} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerSub1}>
            <Text style={styles.title}>{truncateString(he.decode(data.title), 40)}</Text>
            {/* <TouchableOpacity onPress={() => console.log('info')}>
              <Ionicons name="ios-ellipsis-vertical" style={styles.title} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.footerSub2}>
            <Text style={styles.meta}>{typeof data.scale === 'undefined' ? '' : data.scale}</Text>
          </View>
        </View>

        {/* play_modal */}
        {/* TODO: 다른 영역 터치 시 modal toggle */}
        <Modal
          isVisible={openModal}
          style={{ alignItems: 'center' }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <Spinner visible={showLoading} animation="fade" overlayColor="rgba(0,0,0,0.7)" />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>연주하기</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Feather name="x" style={styles.modalHeaderText} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={[styles.mainContainer, { height: '90%' }]}>
                <View style={styles.header}>
                  {/* TODO: replace with image */}
                  {isReady && (
                    <Image source={require('@assets/img/ready.png')} style={styles.ready} />
                  )}
                  <View style={styles.thumbnailImageView}>
                    <Image style={styles.thumbnailImage} source={{ uri: data.thumbnail.url }} />
                  </View>
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerSub1}>
                    <Text style={styles.title}>{truncateString(he.decode(data.title), 70)}</Text>
                  </View>
                  <View style={styles.footerSub2}>
                    <Text style={styles.meta}>
                      {typeof data.scale === 'undefined' ? 'Chord G・A・Em7・A7' : data.scale}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <View style={styles.modalFooter}>
              <View
                style={{
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.grey152,
                    borderRadius: 6,
                    marginRight: 27,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'OpenSauceSans-Black',
                      fontSize: 30,
                      fontStyle: 'italic',
                      color: colors.neon2,
                    }}
                  >
                    A+
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 27,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.grey152,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey40Subtitle2,
                      }}
                    >
                      Chord
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey702,
                      }}
                    >
                      85%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey40Subtitle2,
                      }}
                    >
                      Rhythm
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey702,
                      }}
                    >
                      95%
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: colors.neon2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'OpenSauceSans-Black',
                    fontSize: 20,
                    color: colors.neon2,
                  }}
                >
                  PRACTICE
                </Text>
                <Text
                  style={{
                    fontFamily: 'NanumSquareR',
                    fontSize: 14,
                    letterSpacing: -0.53,
                    color: colors.neon2,
                  }}
                >
                  반주 연습하기
                </Text>
              </View>
            </View> */}
            <TouchableOpacity
              style={[
                styles.modalPlayBtn,
                data.convert === 'Banjued' || { backgroundColor: '#000' },
              ]}
              onPress={
                data.convert === 'Banjued'
                  ? () => {
                      saveHistory(data.id, he.decode(data.title), data.thumbnail.url);
                      getPlaymeta(data.id);
                    }
                  : () => {
                      saveHistory(data.id, he.decode(data.title), data.thumbnail.url);
                      pollingGetPlayMeta(data.id);
                    }
              }
            >
              {isChording ? (
                <Text style={styles.modalPlayText}>
                  CHORDING
                  <AnimatedEllipsis style={styles.modalPlayText} />
                  <AnimateNumber
                    value={animateToNumber}
                    formatter={(val) => {
                      return ` ${parseInt(val, 10)} %`;
                    }}
                  />
                </Text>
              ) : (
                <Text style={styles.modalPlayText}>
                  {data.convert === 'Banjued' ? 'PLAY' : 'MAKE CHORD'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    </>
  );
};

export default ResultListItem;

const styles = EStyleSheet.create({
  mainContainer: {
    height: '70rem',
    width: '100%',
    flexDirection: 'row',
    marginRight: '11rem',
    marginBottom: '10rem',
  },
  thumbnailImageView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  thumbnailImage: {
    flex: 1,
  },
  ready: {
    position: 'absolute',
    height: '20%',
    width: '40%',
    zIndex: 1,
  },
  header: {
    flex: 1.2,
  },
  footer: {
    flex: 1.8,
    marginLeft: '10rem',
  },
  footerSub1: {
    flex: 2,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  footerSub2: {
    flex: 1,
  },
  title: {
    flex: 10,
    fontFamily: 'NanumSquareR',
    fontSize: '15rem',
    color: 'rgb(203,203,203)',
  },
  meta: {
    fontFamily: 'NanumSquareR',
    fontSize: '13rem',
    color: colors.grey40Subtitle2,
  },

  // play modal
  modalContainer: {
    width: '112%',
    height: '40%',
    backgroundColor: colors.grey10Popup2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: '-20rem',
  },
  modalHeader: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 5,
  },
  modalBody: {
    flex: 2,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey152,
    paddingVertical: 10,
  },
  modalFooter: {
    flex: 2.3,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
  },
  modalPlayBtn: {
    flex: 1.4,
    backgroundColor: colors.main2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPlayText: {
    fontFamily: 'OpenSauceSans-Black',
    color: colors.white2,
    fontSize: '22rem',
  },
  modalHeaderText: {
    fontFamily: 'NanumSquareEB',
    color: colors.grey85Text2,
    fontSize: '15rem',
  },
});
