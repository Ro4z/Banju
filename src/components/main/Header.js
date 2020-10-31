import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Platform, Alert, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from '@assets/icon/Ionicons';
import EvilIcons from '@assets/icon/EvilIcons';
import { WIDTH, HEIGHT } from '@constants/dimensions';
import NotiList from '@components/notification/NotificationList';

const Header = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={Platform.isPad ? iPadStyles.mainContainer : iPhoneStyles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Sorry', '프로필 기능은 준비 중입니다.');
        }}
      >
        <EvilIcons
          name="user"
          style={Platform.isPad ? iPadStyles.profile_icon : iPhoneStyles.profile_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('로그아웃 하시겠습니까?', '', [
            {
              text: '확인',
              onPress: async () => {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              },
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ]);
        }}
        style={{ justifyContent: 'center' }}
      >
        <Ionicons
          name="ios-exit-outline"
          style={Platform.isPad ? iPadStyles.logout_icon : iPhoneStyles.logout_icon}
        />
      </TouchableOpacity>

      <Modal isVisible={openModal} animationIn="slideInRight" animationOut="slideOutRight">
        <View style={iPadStyles.modalView}>
          <NotiList onPress={toggleModal.bind()} />
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const iPadStyles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: '8rem',
    marginTop: '8rem',
  },
  profileBtn: {
    width: '16rem',
    height: '16rem',
    borderRadius: '16rem',
  },
  modalView: {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#fff',
    margin: 10,
  },
  profile_icon: {
    fontSize: '15rem',
    color: '#fff',
  },
  logout_icon: {
    fontSize: '10rem',
    color: '#fff',
  },
});

const iPhoneStyles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: '22rem',
    marginTop: '50rem',
    position: 'absolute',
  },
  profileBtn: {
    width: '35rem',
    height: '35rem',
    borderRadius: '35rem',
  },
  modalView: {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: '#fff',
    margin: 10,
  },

  profile_icon: {
    fontSize: '28rem',
    color: '#fff',
  },
  logout_icon: {
    fontSize: '20rem',
    color: '#fff',
  },
});
