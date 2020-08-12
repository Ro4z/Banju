import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BACKGROUND_COLOR} from '../constants/color';

import Icon from '../assets/icon/Ionicons';

class UserInfo extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Icon name="ios-person-circle-outline" style={styles.profile} />
          <Text style={styles.text}>성환</Text>
          <View style={styles.leftSubView}></View>
        </View>
        <View style={styles.rightContainer}></View>
      </View>
    );
  }
}

export default UserInfo;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3A3A3C',
    flexDirection: 'row',
    padding: 30,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    marginRight: 30,
  },
  rightContainer: {
    flex: 2.5,
    backgroundColor: BACKGROUND_COLOR,
  },
  profile: {
    fontSize: 350,
    color: '#BBB',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
