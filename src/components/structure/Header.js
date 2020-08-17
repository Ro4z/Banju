import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import Icon from '../../assets/icon/Ionicons';
import {WIDTH, HEIGHT} from '../../constants/dimensions';
import NotiList from '../../components/notification/NotificationList';

const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => alert('drawer!')}>
        <Icon name="ios-menu-sharp" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Banju</Text>
      <TouchableOpacity onPress={toggleModal.bind()}>
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

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 30,
    color: '#fff',
    margin: 10,
  },
});
