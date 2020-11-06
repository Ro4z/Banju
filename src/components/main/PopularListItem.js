import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { WIDTH } from '@constants/dimensions';
import Ionicons from '@assets/icon/Ionicons';
import { colors } from '@constants/color';
import truncateString from '@utils/truncateString';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const ItemWidth = WIDTH / 3;

const PopularListItem = ({ data, navigation }) => {
  const [showLoading, setShowLoading] = useState(false);

  const saveHistory = async (id, title, thumbnail) => {
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
    setShowLoading(true);
    console.log('CALL', link);
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
            console.log('working');
            if (typeof data.content === 'undefined') return;
          } else if (status === 'finished') {
            clearInterval(pollingObj);
            setShowLoading(false);
            const {
              content: { items, meta },
            } = data;
            navigation.navigate('Practice', {
              chord_arr: items.chord,
              left_note_arr: items.noteLeft,
              right_note_arr: items.noteRight,
              meta,
              previous_screen: 'Main',
            });
          } else {
            // TODO: sentry 연결
            clearInterval(pollingObj);
            setShowLoading(false);
            Alert.alert('오류가 발생하였습니다.');
          }
        })
        .catch((err) => {
          clearInterval(pollingObj);
          setShowLoading(false);
          Alert.alert('오류가 발생하였습니다.');
        });
    }, 1000);
  };

  return (
    <>
      <Spinner visible={showLoading} />
      <TouchableOpacity
        onPress={() => {
          pollingGetPlayMeta(data.id);
          saveHistory(data.id, data.title, data.thumbnail.url);
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View style={styles.thumbnailImageView}>
              <Image style={styles.thumbnailImage} source={{ uri: data.thumbnail.url }} />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerSub1}>
              <Text style={styles.title}>{truncateString(data.title, 27)}</Text>
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                <Ionicons name="ios-ellipsis-vertical" style={styles.title} />
              </TouchableOpacity> */}
            </View>
            <View style={styles.footerSub2}>
              <Text style={styles.meta} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PopularListItem;

const styles = EStyleSheet.create({
  mainContainer: {
    height: '100%',
    width: ItemWidth,
    marginRight: '10rem',
  },
  thumbnailImageView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  thumbnailImage: {
    flex: 1,
  },
  header: {
    flex: 2.7,
    marginVertical: '10rem',
  },
  footer: {
    flex: 2,
  },
  footerSub1: {
    flex: 1.2,
    flexDirection: 'row',
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
    fontSize: '12rem',
    color: colors.grey40Subtitle2,
  },
});
