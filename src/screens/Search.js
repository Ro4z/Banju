import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {BlurView} from '@react-native-community/blur';
import ResultList, {List1, List2} from '../components/search/ResultList';
import Modal from 'react-native-modal';

import {BACKGROUND_COLOR} from '../constants/color';

const Search = ({navigation}) => {
  const [openModal, setOpenModal] = useState(false);
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
        <ResultList
          navigation={navigation}
          onPress={() => {
            setOpenModal(!openModal);
            setTimeout(async () => {
              console.log(openModal);
              setOpenModal(true);
              console.log(openModal);
            }, 1900);
            // setTimeout(() => {
            //   navigation.navigate('Practice');
            // }, 2000);
          }}
        />
        <List1 />
        <List2 />
        <ResultList />
      </ScrollView>
      <Modal
        isVisible={openModal}
        animationIn="zoomIn"
        animationOut="fadeOut"
        style={styles.modal}>
        <ActivityIndicator size="large" color="#00ff00" />
      </Modal>
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
