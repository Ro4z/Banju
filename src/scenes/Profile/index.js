import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Entypo from '@assets/icon/Entypo';
import Ionicons from '@assets/icon/Ionicons';
import {BACKGROUND_COLOR, colors} from '@constants/color';
import EStyleSheet from 'react-native-extended-stylesheet';
import {color} from 'react-native-reanimated';

const Header = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 10,
      }}>
      <Ionicons
        name="ios-chevron-back"
        style={{color: colors.grey85Text2, fontSize: 24}}
      />
      <Text
        style={{
          color: colors.grey85Text2,
          fontFamily: 'NanumSquareR',
          fontSize: 21,
        }}>
        프로필
      </Text>
      <Ionicons
        name="ios-settings"
        style={{color: colors.grey85Text2, fontSize: 24}}
      />
    </View>
  );
};

const Profile = () => {
  const [openMenu1, setOpenMenu1] = useState(true);

  const toggleMenu = () => {
    setOpenMenu1(!openMenu1);
  };
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.bodyContainer}>
        {/* TODO: replace with image */}
        <View style={styles.profileImg} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.profileName}>김반주 </Text>
          {/* <TouchableOpacity>
            <Entypo name="pencil" style={styles.editIcon} />
          </TouchableOpacity> */}
        </View>
        <Text style={styles.profileEmail}>fortebanju@naver.com</Text>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <TouchableOpacity
            style={[
              styles.listHeaderMenu,
              openMenu1 && {borderColor: colors.neon2, borderBottomWidth: 1.5},
            ]}
            onPress={toggleMenu.bind()}>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontFamily: 'OpenSauceSans-Bold',
                },
                openMenu1
                  ? {color: colors.grey85Text2}
                  : {color: '#cbcbcb', opacity: 0.3},
              ]}>
              LIBRARY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listHeaderMenu,
              openMenu1 || {borderColor: colors.neon2, borderBottomWidth: 1.5},
            ]}
            onPress={toggleMenu.bind()}>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontFamily: 'OpenSauceSans-Bold',
                },
                !openMenu1
                  ? {color: colors.grey85Text2}
                  : {color: '#cbcbcb', opacity: 0.3},
              ]}>
              MY PLAY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  bodyContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    paddingTop: 40,
  },
  listContainer: {
    width: '100%',
    height: '55%',
    borderTopWidth: 1,
    borderColor: 'rgba(120,120,120,0.5)',
  },
  profileImg: {
    width: '60rem',
    height: '60rem',
    borderRadius: '60rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  profileName: {
    fontFamily: 'NanumSquareEB',
    fontSize: 30,
    color: colors.white2,
    marginTop: '7rem',
    marginBottom: '4rem',
  },
  editIcon: {fontSize: 26, color: colors.dusk},
  profileEmail: {
    fontFamily: 'OpenSauceSans-Regular',
    fontSize: 22,
    color: colors.neon2,
  },
  listHeader: {
    width: '100%',
    height: '16rem',
    flexDirection: 'row',
  },
  listHeaderMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
