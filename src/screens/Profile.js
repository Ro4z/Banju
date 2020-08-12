import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BACKGROUND_COLOR} from '../constants/color';
import UserInfo from '../components/profile/UserInfo';
import UserGraph from '../components/profile/UserGraph';
import PracticeList from '../components/profile/PracticeList';
import Icon from '../assets/icon/Ionicons';

class Profile extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Icon name="ios-person-circle-outline" style={styles.profile} />
          <UserInfo name="성환" followers={31} following={291} />
        </View>
        <View style={styles.rightContainer}>
          <PracticeList />
          <UserGraph />
        </View>
      </View>
    );
  }
}

export default Profile;

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
    padding: 40,
    backgroundColor: BACKGROUND_COLOR,
  },
  profile: {
    fontSize: 350,
    color: '#BBB',
  },
});
