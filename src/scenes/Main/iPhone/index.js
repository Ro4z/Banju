import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import Header from '@components/main/Header';
import RecentList from '@components/main/RecentList';
import NewChordList from '@components/main/NewChordList';
import PopularList from '@components/main/PopularList';
import { BACKGROUND_COLOR, colors } from '@constants/color';
import Ionicons from '@assets/icon/Ionicons';
import { HEIGHT, WIDTH } from '@constants/dimensions';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const Main = ({ navigation }) => {
  const [historyJSON, setHistoryJSON] = useState({});
  const [popularList, setPopularList] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      const HISTORY_JSON = JSON.parse(await AsyncStorage.getItem('Practice:history'));
      if (HISTORY_JSON) setHistoryJSON(HISTORY_JSON);
    };

    const fetchPopular = () => {
      console.log(TokenStore.userToken);
      axios
        .get(Base.GET_POPULAR, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TokenStore.userToken}`,
          },
        })
        .then((res) => {
          const { items } = res.data;
          setPopularList(items);
        })
        .catch((err) => console.log(err));
    };
    getHistory();
    fetchPopular();
    Orientation.lockToPortrait();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <ImageBackground
        style={styles.mainContainer}
        source={require('@assets/img/background_home_iphone.jpg')}
        blurRadius={20}
        opacity={0.2}
      >
        <ScrollView>
          <View style={styles.bodyContainer}>
            <View style={styles.bodySubContainer} />
            <View style={styles.bodySubContainer}>
              <Image style={styles.logoImage} source={require('@assets/img/logo_banju.png')} />
              <Text style={styles.bodyText}>오늘은 어떤 연주로</Text>
              <Text style={styles.bodyText}>하루를 마무리해볼까요</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ flex: 1 }}>
                <View style={styles.searchBarView}>
                  <Ionicons name="search" style={styles.searchIcon} />

                  <View style={styles.searchInputView}>
                    <Text style={styles.searchInputText}>곡 제목을 검색하세요</Text>
                  </View>

                  {/* <TouchableOpacity>
                  <Feather name="upload" style={[styles.searchIcon, { color: colors.white2 }]} />
                </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            </View>
            <Header navigation={navigation} />
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.cardView}>
              <View style={styles.cardViewTitleView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.cardViewTitle}>HISTORY</Text>
                  <Text style={styles.cardViewTitleSub}>최근연습곡</Text>
                </View>
                {/* <TouchableOpacity>
                <Ionicons
                  name="ios-chevron-forward"
                  style={{ color: colors.grey85Text2, fontSize: 24 }}
                />
              </TouchableOpacity> */}
              </View>
              <RecentList historyJSON={historyJSON} navigation={navigation} />
            </View>
            {/* <View style={styles.cardView}>
                <View style={styles.cardViewTitleView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.cardViewTitle}>NEWCHORDED</Text>
                    <Text style={styles.cardViewTitleSub}>최신업데이트</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="ios-chevron-forward"
                      style={{ color: colors.grey85Text2, fontSize: 24 }}
                    />
                  </TouchableOpacity>
                </View>
                <NewChordList />
              </View> */}
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.cardView}>
              <View style={styles.cardViewTitleView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.cardViewTitle}>TRENDING</Text>
                  <Text style={styles.cardViewTitleSub}>인기순위</Text>
                </View>
                {/* <TouchableOpacity>
                  <Ionicons
                    name="ios-chevron-forward"
                    style={{ color: colors.grey85Text2, fontSize: 24 }}
                  />
                </TouchableOpacity> */}
              </View>
              <PopularList data={popularList} navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    ...ifIphoneX(
      {
        paddingTop: 40,
      },
      {
        paddingTop: 20,
      }
    ),
  },
  bodyContainer: {
    height: HEIGHT / 1.5,
  },
  footerContainer: {
    height: HEIGHT / 3,
    marginBottom: 10,
  },
  bodySubContainer: {
    flex: 1,
    paddingHorizontal: '22rem',
    justifyContent: 'center',
  },

  logoImage: {
    width: '32rem',
    height: '22rem',
    marginBottom: '20rem',
  },
  bodyText: {
    fontFamily: 'NanumSquareEB',
    fontSize: '20rem',
    color: colors.white2,
    marginBottom: '10rem',
  },

  // search bar
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
  searchInputView: {
    flex: 1,
    fontFamily: 'NanumSquareR',
    fontSize: '13rem',
    color: colors.grey85Text2,
    marginLeft: '5rem',
  },
  searchInputText: {
    fontFamily: 'NanumSquareR',
    fontSize: '13rem',
    color: colors.grey85Text2,
  },
  // card view
  cardView: {
    backgroundColor: '#0d0d0d',
    width: '100%',
    height: '260rem',
    paddingHorizontal: '22rem',
    paddingVertical: '12rem',
    marginBottom: '7rem',
  },
  cardViewTitleView: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardViewListView: {
    flex: 4,
  },
  cardViewTitle: {
    fontFamily: 'OpenSauceSans-ExtraBold',
    fontSize: '20rem',
    color: colors.white2,
    marginRight: '7rem',
  },
  cardViewTitleSub: {
    fontFamily: 'NanumSquareR',
    fontSize: '15rem',
    color: colors.grey40Subtitle2,
  },
  cardViewTitleIcon: {
    color: colors.grey85Text2,
    fontSize: '20rem',
  },
});
