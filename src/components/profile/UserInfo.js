import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const UserInfo = ({name, followers, following}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <View style={styles.subContainer}>
          <Text style={styles.number}>{followers}</Text>
          <Text style={styles.text}>팔로워</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.number}>{following}</Text>
          <Text style={styles.text}>팔로우</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'gray',
  },
});
