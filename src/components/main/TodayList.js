import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import List from './RecentList';
Icon.loadFont();

const TodayList = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        <Icon name="music" style={[styles.title]} /> Today's Chord Progression
      </Text>
      <List navigation={navigation} />
    </View>
  );
};

export default TodayList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    color: 'rgb(235, 235, 245)',
    fontWeight: 'bold',
  },
});
