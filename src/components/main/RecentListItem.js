import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {WIDTH} from '@constants/dimensions';
import {colors} from '@constants/color';

const ItemWidth = WIDTH / 6;
const ImageWidth = WIDTH / 7;
const RecentListItem = () => {
  return (
    <View style={styles.mainContainer}>
      {/* TODO: replace with image */}
      <View style={styles.thumbnailImage} />
      <Text style={styles.title}>
        영상제목영상제목영상{'\n'}영상제목영상제목영상
      </Text>
      <Text style={styles.meta}>1일전 ・ Rank A+</Text>
    </View>
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
  thumbnailImage: {
    height: ImageWidth,
    width: ImageWidth,
    borderRadius: ImageWidth,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontFamily: 'NanumSquareR',
    fontSize: '6rem',
    color: 'rgb(203,203,203)',
    marginTop: '5.5rem',
    marginBottom: '3rem',
  },
  meta: {
    fontFamily: 'NanumSquareR',
    fontSize: '5rem',
    color: colors.grey40Subtitle2,
  },
});
