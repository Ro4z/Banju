import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from '../vector-icon/Ionicons';
// import Icon from 'react-native-vector-icons/Ionicons'

const Header = () => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => alert('drawer!')}>
        <Icon name="ios-menu-sharp" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Banju</Text>
      <TouchableOpacity onPress={() => alert('notification!')}>
        <Icon name="ios-notifications-outline" style={styles.icon} />
      </TouchableOpacity>
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
