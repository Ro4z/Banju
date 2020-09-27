import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Ionicons from '@assets/icon/Ionicons';
import {HEIGHT} from '@constants/dimensions';
import {colors, BACKGROUND_COLOR} from '@constants/color';
import FavoriteList from '@components/profile/FavoriteList';
import UserGraph from '@components/profile/UserGraph';

const MyPlay = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 2,
        justifyContent: 'space-between',
      }}
      style={{backgroundColor: BACKGROUND_COLOR}}
      indicatorStyle="black">
      <View style={styles.cardView}>
        <TouchableOpacity style={styles.cardViewTitleView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.cardViewTitle}>PLAYTIME</Text>
            <Text style={styles.cardViewTitleSub}>연습량</Text>
          </View>

          <Ionicons
            name="ios-chevron-forward"
            style={{color: colors.grey85Text2, fontSize: 24}}
          />
        </TouchableOpacity>
        <UserGraph />
      </View>
    </ScrollView>
  );
};

export default MyPlay;

const styles = EStyleSheet.create({
  //card view
  cardView: {
    backgroundColor: '#0d0d0d',
    width: '100%',
    height: '150rem',
    paddingHorizontal: '10rem',
    paddingVertical: '7rem',
  },
  cardViewTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardViewTitle: {
    fontFamily: 'OpenSauceSans-ExtraBold',
    fontSize: '9rem',
    color: colors.white2,
    marginRight: '3rem',
  },
  cardViewTitleSub: {
    fontFamily: 'NanumSquareR',
    fontSize: '6rem',
    color: colors.grey40Subtitle2,
  },
});
