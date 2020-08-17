import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Icon from '../../assets/icon/EvilIcons';

const NotificationListItem = ({seonghwan}) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={
          seonghwan
            ? require('../../assets/img/profile_sample2.png')
            : require('../../assets/img/profile_sample1.png')
        }
        style={styles.img}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          {seonghwan
            ? '성환 님이\nThank You Lord - Do Moen를\n완주하였습니다!'
            : '헨리 님이\nAlan Walker - Faded를\n완주하였습니다!'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="like" style={styles.likeIcon} />
          <Icon name="heart" style={styles.heartIcon} />
        </View>
      </View>
    </View>
  );
};

export default NotificationListItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgb(37,37,37)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  subContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    height: '100%',
  },
  img: {
    height: 140,
    width: 140,
    marginRight: 20,
    resizeMode: 'stretch',
  },
  text: {
    color: 'white',
    fontSize: 23,
  },
  likeIcon: {
    marginTop: 10,
    color: 'rgb(45,115,210)',
    fontSize: 50,
  },
  heartIcon: {
    marginTop: 10,
    color: 'rgb(200,50,60)',
    fontSize: 50,
  },
});
