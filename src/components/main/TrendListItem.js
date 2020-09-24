import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {WIDTH} from '@constants/dimensions';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from '@assets/icon/Ionicons';
import {colors} from '@constants/color';

const ItemWidth = WIDTH / 5.2;

const TrendListItem = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        {/* TODO: replace with image */}
        <View style={styles.thumbnailImage} />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerSub1}>
          <Text style={styles.title}>
            영상제목영상제목영상{'\n'}영상제목영상제목영상
          </Text>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="ios-ellipsis-vertical" style={styles.title} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerSub2}>
          <Text style={styles.meta}>Chord G・A・Em7・A7</Text>
        </View>
      </View>
    </View>
  );
};

export default TrendListItem;

const styles = EStyleSheet.create({
  mainContainer: {
    height: '100%',
    width: ItemWidth,
    marginRight: '10rem',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
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
    fontSize: '6rem',
    color: 'rgb(203,203,203)',
  },
  meta: {
    fontFamily: 'NanumSquareR',
    fontSize: '5rem',
    color: colors.grey40Subtitle2,
  },
});
