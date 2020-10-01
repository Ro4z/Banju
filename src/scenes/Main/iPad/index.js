import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '@components/structure/Header';
import RecentList from '@components/main/RecentList';
import NewChordList from '@components/main/NewChordList';
import TrendList from '@components/main/TrendList';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import {HEIGHT} from '@constants/dimensions';
import {BACKGROUND_COLOR} from '@constants/color';
import {colors} from '@constants/color';

const Home = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <ScrollView style={styles.mainContainer} alwaysBounceVertical={false}>
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
        <View style={styles.searchBarView}>
          <Ionicons name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="곡 제목을 검색하세요"
            placeholderTextColor={colors.grey40Subtitle2}
            onChangeText={(text) => setSearchInput(text)}
            onSubmitEditing={() =>
              navigation.navigate('Search', {query: searchInput})
            }
          />
          <TouchableOpacity>
            <Feather name="upload" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.cardView}>
        <View style={styles.cardViewTitleView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.cardViewTitle}>HISTORY</Text>
            <Text style={styles.cardViewTitleSub}>최근연습곡</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="ios-chevron-forward"
              style={{color: colors.grey85Text2, fontSize: 24}}
            />
          </TouchableOpacity>
        </View>
        <RecentList />
      </View>
      <View style={styles.cardView}>
        <View style={styles.cardViewTitleView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.cardViewTitle}>NEWCHORDED</Text>
            <Text style={styles.cardViewTitleSub}>최신업데이트</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="ios-chevron-forward"
              style={{color: colors.grey85Text2, fontSize: 24}}
            />
          </TouchableOpacity>
        </View>
        <NewChordList />
      </View>
      <View style={styles.cardView}>
        <View style={styles.cardViewTitleView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.cardViewTitle}>TRENDING</Text>
            <Text style={styles.cardViewTitleSub}>인기순위</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="ios-chevron-forward"
              style={{color: colors.grey85Text2, fontSize: 24}}
            />
          </TouchableOpacity>
        </View>
        <TrendList />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
    paddingTop: 20,
  },
  imgBackground: {width: '100%', height: HEIGHT / 2, alignItems: 'center'},
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20rem',
    marginBottom: '12rem',
  },

  //body
  logo: {
    width: '14.25rem',
    height: '9.75rem',
    marginBottom: '8rem',
  },
  bodyText: {
    fontFamily: 'NanumSquareEB',
    fontSize: '9rem',
    color: colors.white2,
    textAlign: 'center',
  },

  //search bar
  searchBarView: {
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
  searchInput: {
    flex: 1,
    fontFamily: 'NanumSquareR',
    fontSize: '7rem',
    color: '#cbcbcb',
    marginLeft: '4rem',
  },

  //card view
  cardView: {
    backgroundColor: '#0d0d0d',
    width: '100%',
    height: HEIGHT / 2.4,
    paddingHorizontal: '10rem',
    paddingVertical: '7rem',
    marginBottom: '7rem',
  },
  cardViewTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
  },
  cardViewListView: {
    flex: 4,
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
