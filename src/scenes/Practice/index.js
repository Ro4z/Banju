import React from 'react';
import {View, Text, Platform} from 'react-native';

import PhoneScreen from './Phone';
import TabScreen from './Tab';

const Practice = ({navigation, route}) => {
  return Platform.isPad ? (
    <TabScreen navigation={navigation} route={route} />
  ) : (
    <PhoneScreen navigation={navigation} route={route} />
  );
};

export default Practice;
