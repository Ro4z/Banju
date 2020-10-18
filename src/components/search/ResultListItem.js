import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import Base from '@base';
import {WIDTH} from '@constants/dimensions';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import {colors} from '@constants/color';

const TEST_LINK = 'ded0OSwuXwY';

const ResultListItem = ({isReady, navigation}) => {
  const [openModal, setOpenModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  //TODO: 개발 완료 후 default link 삭제
  const pollingGetPlayMeta = (link = 'hHr-tr2Lz_E') => {
    setShowLoading(true);
    let pollingObj;
    pollingObj = setInterval(() => {
      axios
        .get(Base.GET_PLAYMETA + link, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        // status: "error" | "working" | "finished"
        .then(({data, data: {status}}) => {
          if (status === 'working') {
            console.log('working');
          } else if (status === 'finished') {
            console.log('finished');
            clearInterval(pollingObj);
            setShowLoading(false);
            setOpenModal(false);
            const {
              content: {items, meta},
            } = data;
            navigation.navigate('Practice', {
              chord_arr: items.chord,
              left_note_arr: items.noteLeft,
              right_note_arr: items.noteRight,
              meta: meta,
            });
          } else {
            console.log('error!');
            setShowLoading(false);
            Alert.alert('오류가 발생하였습니다.');
            clearInterval(pollingObj);
          }
        })
        .catch((err) => {
          console.log('axios error', err);
          setShowLoading(false);
          Alert.alert('오류가 발생하였습니다.');
          clearInterval(pollingObj);
        });
    }, 1000);
  };

  return (
    <>
      <Spinner visible={showLoading} textContent={'Loading...'} />
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={toggleModal.bind()}>
        <View style={styles.header}>
          {/* TODO: replace with image */}
          {isReady && (
            <Image
              source={require('@assets/img/ready.png')}
              style={styles.ready}
            />
          )}
          <View style={styles.thumbnailImage} />
        </View>
        <View style={styles.footer}>
          <View style={styles.footerSub1}>
            <Text style={styles.title}>
              영상제목영상제목영상제목{'\n'}영상제목영상제목영상제목
            </Text>
            <TouchableOpacity onPress={() => console.log('info')}>
              <Ionicons name="ios-ellipsis-vertical" style={styles.title} />
            </TouchableOpacity>
          </View>
          <View style={styles.footerSub2}>
            <Text style={styles.meta}>Chord G・A・Em7・A7</Text>
          </View>
        </View>

        {/* play_modal */}
        {/* TODO: 다른 영역 터치 시 modal toggle */}
        <Modal
          isVisible={openModal}
          style={{alignItems: 'center'}}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <Spinner
            visible={showLoading}
            animation="fade"
            overlayColor="rgba(0,0,0,0.7)"
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>연주하기</Text>
              <TouchableOpacity onPress={toggleModal.bind()}>
                <Feather name="x" style={styles.modalHeaderText} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={[styles.mainContainer, {height: '90%'}]}>
                <View style={styles.header}>
                  {/* TODO: replace with image */}
                  {isReady && (
                    <Image
                      source={require('@assets/img/ready.png')}
                      style={styles.ready}
                    />
                  )}
                  <View style={styles.thumbnailImage} />
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerSub1}>
                    <Text style={styles.title}>
                      영상제목영상제목영상{'\n'}영상제목영상제목영상
                    </Text>
                  </View>
                  <View style={styles.footerSub2}>
                    <Text style={styles.meta}>Chord G・A・Em7・A7</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.modalFooter}>
              <View
                style={{
                  flex: 1,
                  marginRight: 20,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.grey152,
                    borderRadius: 6,
                    marginRight: 27,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'OpenSauceSans-Black',
                      fontSize: 30,
                      fontStyle: 'italic',
                      color: colors.neon2,
                    }}>
                    A+
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 27,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.grey152,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey40Subtitle2,
                      }}>
                      Chord
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey702,
                      }}>
                      85%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey40Subtitle2,
                      }}>
                      Rhythm
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSauceSans-Medium',
                        fontSize: 14,
                        color: colors.grey702,
                      }}>
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
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSauceSans-Black',
                    fontSize: 20,
                    color: colors.neon2,
                  }}>
                  PRACTICE
                </Text>
                <Text
                  style={{
                    fontFamily: 'NanumSquareR',
                    fontSize: 14,
                    letterSpacing: -0.53,
                    color: colors.neon2,
                  }}>
                  반주 연습하기
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.modalPlayBtn}
              onPress={() => {
                pollingGetPlayMeta(TEST_LINK);
              }}>
              <Text style={styles.modalPlayText}>PLAY</Text>
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
  thumbnailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  ready: {
    position: 'absolute',
    height: '20%',
    width: '40%',
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
    //alignItems: 'center',
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

  //play modal
  modalContainer: {
    width: '112%',
    height: '50%',
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
    flex: 2,
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
