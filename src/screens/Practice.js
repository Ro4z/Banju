import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import Game from '../components/game';
import Tutorial from '../components/game/Tutorial';

const Practice = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(true);
  }, []);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View style={styles.mainContainer}>
      <Game />
      <Modal
        isVisible={openModal}
        animationIn="zoomIn"
        animationOut="fadeOut"
        style={styles.modal}>
        <Tutorial onPress={toggleModal.bind()} />
      </Modal>
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  modal: {
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
});
