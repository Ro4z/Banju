import React, { useState } from 'react';
import { Text, Alert, View, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

import { WIDTH } from '@constants/dimensions';
import { colors } from '@constants/color';
import truncateString from '@utils/truncateString';
import calculateDaybefore from '@utils/calculateDaybefore';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const ItemWidth = WIDTH / 3;
const ImageWidth = WIDTH / 3.5;
const RecentListItem = ({ data, navigation }) => {
  const [showLoading, setShowLoading] = useState(false);
  // console.log(data);
  const pollingGetPlayMeta = (link) => {
    if (typeof link === 'undefined') return;
    setShowLoading(true);
    console.log('CALL', link);
    const pollingObj = setInterval(() => {
      axios
        .get(Base.GET_PLAYMETA + link, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TokenStore.userToken}`,
          },
        })
        // status: "error" | "working" | "finished"
        .then(({ data, data: { status } }) => {
          if (status === 'working') {
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
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            data && pollingGetPlayMeta(data.id);
          }}
        >
          {/* TODO: replace with image */}
          <View style={styles.thumbnailImageView}>
            <Image style={styles.thumbnailImage} source={{ uri: data && data.thumbnail }} />
          </View>
          <Text style={styles.title}>{data && truncateString(data.title)}</Text>
          <Text style={styles.meta}>{data && calculateDaybefore(data.playTime)}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RecentListItem;

const styles = EStyleSheet.create({
  mainContainer: {
    height: '100%',
    width: ItemWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5rem',
  },
  thumbnailImageView: {
    height: ImageWidth,
    width: ImageWidth,
    borderRadius: ImageWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  thumbnailImage: {
    height: ImageWidth,
    width: ImageWidth,
    borderRadius: ImageWidth,
  },
  title: {
    fontFamily: 'NanumSquareR',
    fontSize: '15rem',
    color: 'rgb(203,203,203)',
    marginTop: '5.5rem',
    marginBottom: '3rem',
  },
  meta: {
    fontFamily: 'NanumSquareR',
    fontSize: '14rem',
    color: colors.grey40Subtitle2,
  },
});
