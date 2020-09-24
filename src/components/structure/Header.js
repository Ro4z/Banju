import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@assets/icon/Ionicons';
import {WIDTH, HEIGHT} from '@constants/dimensions';
import NotiList from '@components/notification/NotificationList';

const Header = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={navigateProfile.bind()}>
        <Image
          source={require('@assets/img/profile_sample2.png')}
          style={styles.profileBtn}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleModal.bind()}
        style={{justifyContent: 'center'}}>
        <Icon name="ios-notifications-outline" style={styles.icon} />
      </TouchableOpacity>

      <Modal
        isVisible={openModal}
        animationIn="slideInRight"
        animationOut="slideOutRight">
        <View style={styles.modalView}>
          <NotiList onPress={toggleModal.bind()} />
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = EStyleSheet.create({
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
  icon: {
    fontSize: '10rem',
    color: '#fff',
  },
});
