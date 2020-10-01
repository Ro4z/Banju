import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import ResultList from '@components/search/ResultList';
import {BACKGROUND_COLOR} from '@constants/color';
import Ionicons from '@assets/icon/Ionicons';
import Feather from '@assets/icon/Feather';
import {colors} from '@constants/color';

const Search = ({route}) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (typeof route.params === 'undefined') return;
    if (route.params.hasOwnProperty('query'))
      setSearchInput(route.params.query);
  }, [route]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
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
            <Feather name="x" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <ResultList />
      </View>
    </View>
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
      },
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

  //search bar
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
