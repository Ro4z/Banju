/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Orientation from 'react-native-orientation';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import axios from 'axios';

import ResultList from '@components/search/ResultList';
import { BACKGROUND_COLOR, colors } from '@constants/color';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const Search = ({ route, navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  
  const textInputRef = useRef()
  const nextPageToken = useRef('');

  useEffect(() => {
    if (typeof route.params === 'undefined') return;
    Object.prototype.hasOwnProperty.call(setSearchInput(route.params.query), 'query');
  }, [route]);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const fetchGetSearch = () => {
    setShowLoading(true);
    if (searchInput === '') return;
    firebase.analytics().logEvent('onSearch', {
      keyword: searchInput,
    });

    axios
      .get(Base.GET_SEARCH + searchInput, {
        params: {
          pageToken: nextPageToken.current,
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZjhiMzcwLTEyYzItMTFlYi04M2QzLTNiZGFjOGY1NDUyNSIsImF1dGgiOiJodHRwOi8vYXBpLmRhaWx5YmFuanUuY29tIiwiaWF0IjoxNjA0MTUwOTc5fQ.r_zgjb68ciErFF-JGdhOiqrdTUQ1uBgsuV7evycvstw`,
        },
      })
      .then((res) => {
        setSearchData(res.data.items);
        setShowLoading(false);
      })
      .catch((err) => {
        console.log('GET SEARCH ERR :>>', err);
        Alert.alert('Sorry', '오류가 발생하였습니다.');
        setShowLoading(false);
      });
  };

  const fetchPagination =() => {
    setShowLoading(true);
    if (searchInput === '') return;
  
    axios
      .get(Base.GET_SEARCH + searchInput, {
        params: {
          pageToken: nextPageToken.current,
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwZjhiMzcwLTEyYzItMTFlYi04M2QzLTNiZGFjOGY1NDUyNSIsImF1dGgiOiJodHRwOi8vYXBpLmRhaWx5YmFuanUuY29tIiwiaWF0IjoxNjA0MTUwOTc5fQ.r_zgjb68ciErFF-JGdhOiqrdTUQ1uBgsuV7evycvstw`,
        },
      })
      .then((res) => {
        setSearchData([...searchData, ...res.data.items]);
        nextPageToken.current = res.data.nextPageToken;
        setShowLoading(false);
      })
      .catch((err) => {
        console.log('GET SEARCH ERR :>>', err);
        Alert.alert('Sorry', '오류가 발생하였습니다.');
        setShowLoading(false);
      });
  }

  const clearSearchInput = React.useCallback(() => {
    textInputRef.current.focus()
    setSearchData([])
    setSearchInput('');
  });

  const goBack = React.useCallback(() => {
    navigation.goBack();
  });

  return (
    <>
      <Spinner visible={showLoading} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.searchBarView}>
            <Ionicons name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="곡 제목을 검색하세요"
              ref={textInputRef}
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
              placeholderTextColor={colors.grey40Subtitle2}
              onSubmitEditing={() => fetchGetSearch()}
              autoFocus
            />
            <TouchableOpacity onPress={clearSearchInput}>
              <Feather name="x" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContainer}>
          <ResultList navigation={navigation} data={searchData} onScrollEnd={fetchPagination} />
        </View>
      </View>
    </>
  );
};

export default Search;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: 25,
    ...ifIphoneX(
      {
        paddingTop: 80,
      },
      {
        paddingTop: 60,
      }
    ),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    height: '100%',
    width: '100%',
    marginTop: 40,
  },

  // search bar
  searchBarView: {
    width: '80%',
    height: '40rem',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: '10rem',
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
  cancelText: {
    fontFamily: 'OpenSauceSans-Light',
    color: colors.grey30Dimmed2,
    fontSize: '15rem',
  },
});
