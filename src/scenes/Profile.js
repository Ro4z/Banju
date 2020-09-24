import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {BACKGROUND_COLOR} from '../constants/color';
import UserInfo from '../components/profile/UserInfo';
import UserGraph from '../components/profile/UserGraph';
import CircleGraph from '../components/profile/CircleGraph';
import PracticeList from '../components/profile/PracticeList';
import Icon from '../assets/icon/Ionicons';

class Profile extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../assets/img/profile_sample2.png')}
            style={{
              width: 250,
              height: 250,
              borderRadius: 250,
              resizeMode: 'stretch',
              marginTop: 100,
              marginBottom: 40,
            }}
          />
          <UserInfo name="성환" followers={31} following={291} />
        </View>
        <View style={styles.rightContainer}>
          <PracticeList />
          <View style={{flexDirection: 'row'}}>
            <CircleGraph />
            <UserGraph />
          </View>
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
