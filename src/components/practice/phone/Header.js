import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Orientation from 'react-native-orientation';

import {colors} from '@constants/color';
import Feather from '@assets/icon/Feather';
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';

const Header = ({navigation}) => {
  const goBack = () => {
    Orientation.lockToPortrait();
    navigation.navigate('Search');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <Feather
          name="settings"
          style={{color: colors.grey85Text2, fontSize: 22}}
        />
        <SimpleLineIcons
          name="pencil"
          style={{color: colors.grey85Text2, fontSize: 22, marginLeft: 20}}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={[styles.title, {marginRight: 40}]}>영상제목</Text>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={goBack.bind()}>
          <Feather
            name="x"
            style={{color: colors.grey85Text2, fontSize: 22, marginRight: 0}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(12,12,12)',
    borderBottomWidth: 1,
    borderColor: colors.neon2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...ifIphoneX({paddingHorizontal: 60}, {paddingHorizontal: 30}),
  },
  subContainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'NanumSquareR',
    fontSize: 16,
    color: colors.grey85Text2,
  },
});
