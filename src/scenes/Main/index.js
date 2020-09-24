import React, {useState} from 'react';
import {Text, View, ImageBackground, Image, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '@components/structure/Header';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import {HEIGHT} from '@constants/dimensions';
import {BACKGROUND_COLOR} from '@constants/color';
import {colors} from '@constants/color';

const Home = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('@assets/img/background_home.png')}>
        <Header navigation={navigation} />

        <View style={styles.subContainer}>
          <Image
            source={require('@assets/img/logo_banju.png')}
            style={styles.logo}
          />
          <Text style={styles.bodyText}>오늘은 어떤 연주로</Text>
          <Text style={styles.bodyText}>하루를 마무리 해볼까요</Text>
        </View>
        <View style={styles.textInputView}>
          <Ionicons name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="곡 제목을 검색하세요"
            placeholderTextColor={colors.grey40Subtitle2}
          />
          <Feather name="upload" style={styles.searchIcon} />
        </View>

        <View style={styles.cardView}></View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  imgBackground: {width: '100%', height: HEIGHT / 1.8, alignItems: 'center'},
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20rem',
    marginBottom: '10rem',
  },

  //body
  logo: {
    width: '14.25rem',
    height: '9.75rem',
    marginBottom: '5rem',
  },
  bodyText: {
    fontFamily: 'NanumSquareEB',
    fontSize: '9rem',
    color: colors.white2,
    textAlign: 'center',
  },

  //search bar
  textInputView: {
    width: '50%',
    height: '17rem',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: '5rem',
  },
  searchIcon: {
    fontSize: '8rem',
    color: colors.grey40Subtitle2,
  },
  textInput: {
    flex: 1,
    fontFamily: 'NanumSquareR',
    fontSize: '7rem',
    color: '#cbcbcb',
    marginLeft: '4rem',
  },

  //card view
});
