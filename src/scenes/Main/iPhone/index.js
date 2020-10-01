import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '@components/structure/Header';
import {BACKGROUND_COLOR, colors} from '@constants/color';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';

const Main = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.bodyContainer}
        source={require('@assets/img/background_home_iphone.png')}
        blurRadius={30}>
        <View style={styles.bodySubContainer}></View>
        <View style={styles.bodySubContainer}>
          <Image
            style={styles.logoImage}
            source={require('@assets/img/logo_banju.png')}
          />
          <Text style={styles.bodyText}>오늘은 어떤 연주로</Text>
          <Text style={styles.bodyText}>하루를 마무리해볼까요</Text>
          <View style={styles.searchBarView}>
            <Ionicons name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="곡 제목을 검색하세요"
              value={searchInput}
              placeholderTextColor={colors.grey40Subtitle2}
              onSubmitEditing={() => navigation.navigate('Search')}
            />
            <TouchableOpacity>
              <Feather
                name="upload"
                style={[styles.searchIcon, {color: colors.white2}]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Header />
      </ImageBackground>
      <View style={styles.footerContainer}></View>
    </View>
  );
};

export default Main;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    ...ifIphoneX(
      {
        paddingTop: 40,
      },
      {
        paddingTop: 20,
      },
    ),
  },
  bodyContainer: {
    flex: 2,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: 'green',
  },
  bodySubContainer: {
    flex: 1,
    paddingHorizontal: '22rem',
  },

  logoImage: {
    width: '32rem',
    height: '22rem',
    //resizeMode: 'stretch',
    marginBottom: '20rem',
  },
  bodyText: {
    fontFamily: 'NanumSquareEB',
    fontSize: '20rem',
    color: colors.white2,
    marginBottom: '10rem',
  },

  //search bar
  searchBarView: {
    width: '100%',
    height: '45rem',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: '15rem',
    marginTop: '20rem',
  },
  searchIcon: {
    fontSize: '20rem',
    color: colors.grey40Subtitle2,
    marginRight: '3rem',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'NanumSquareR',
    fontSize: '13rem',
    color: colors.grey85Text2,
    marginLeft: '5rem',
  },
});
