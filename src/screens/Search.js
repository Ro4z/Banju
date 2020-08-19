import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {BlurView} from '@react-native-community/blur';
import ResultList, {List1, List2} from '../components/search/ResultList';

import {BACKGROUND_COLOR} from '../constants/color';

const Search = ({navigation}) => {
  const searchBarRef = useRef(null);
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('../assets/img/background_search.jpg')}
      />
      <BlurView
        style={styles.absolute}
        blurType="dark"
        reducedTransparencyFallbackColor="white"
      />
      <SearchBar
        ref={searchBarRef}
        placeholder="Youtube Link를 입력해주세요."
        onChangeText={(text) => console.log(text)}
        onSearchButtonPress={() => console.log('search')}
        onCancelButtonPress={() => console.log('cancel')}
        barStyle="black"
      />
      <ScrollView>
        <ResultList navigation={navigation} />
        <List1 />
        <List2 />
        <ResultList />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  imgBackground: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
