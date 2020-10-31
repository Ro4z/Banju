import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Orientation from 'react-native-orientation';
import ProgressBar from 'react-native-progress/Bar';

import { colors } from '@constants/color';
import Feather from '@assets/icon/Feather';
import Ionicons from '@assets/icon/Ionicons';
import SimpleLineIcons from '@assets/icon/SimpleLineIcons';
import truncateString from '@utils/truncateString';

const Header = ({ navigation, title, progress = 0 }) => {
  const goBack = () => {
    Orientation.lockToPortrait();
    navigation.navigate('Main');
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => Alert.alert('Sorry', '준비 중인 기능입니다.')}>
            <Feather name="settings" style={() => Alert.alert('Sorry', '준비 중인 기능입니다.')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <SimpleLineIcons name="pencil" style={[styles.icon, { marginLeft: 20 }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          {/* TODO: 길이가 긴 제목의 처리 추가 */}
          <Text style={[styles.title, { marginLeft: 0 }]}>{truncateString(title, 55)}</Text>
          {/* <TouchableOpacity onPress={null}>
            <Ionicons
              style={[styles.icon, {fontSize: 18}]}
              name="ios-ellipsis-vertical-sharp"
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={goBack.bind()}>
            <Feather name="x" style={{ color: colors.grey85Text2, fontSize: 22, marginRight: 0 }} />
          </TouchableOpacity>
        </View>
      </View>
      <ProgressBar
        width={null}
        useNativeDriver
        borderColor="rgba(0,0,0,0)"
        color={colors.neon2}
        progress={progress}
        indeterminateAnimationDuration={250}
        height={0.5}
        borderRadius={0}
      />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(12,12,12)',
    // borderBottomWidth: 1,
    // borderColor: colors.neon2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...ifIphoneX({ paddingHorizontal: 60 }, { paddingHorizontal: 30 }),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NanumSquareR',
    fontSize: 16,
    color: colors.grey85Text2,
  },
  icon: {
    color: colors.grey85Text2,
    fontSize: 22,
  },
});
