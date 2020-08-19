import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from '../../assets/icon/Ionicons';
import Item from './NotificationListItem';

const NotificationList = ({onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="ios-close-sharp" style={styles.icon} />
      </TouchableOpacity>
      <ScrollView>
        <Item />
        <Item seonghwan />
      </ScrollView>
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  mainContainer: {
    width: '40%',
    height: '100%',
    backgroundColor: 'rgb(50,50,50)',
    padding: 10,
  },
  icon: {
    fontSize: 50,
    color: 'rgb(200,200,200)',
    marginBottom: 20,
  },
});
