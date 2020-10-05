import React from 'react';
import {View, Text, Platform} from 'react-native';

import PhoneScreen from './Phone';
import TabScreen from './Tab';

const Practice = ({navigation}) => {
  return Platform.isPad ? (
    <TabScreen navigation={navigation} />
  ) : (
    <PhoneScreen navigation={navigation} />
  );
};

export default Practice;
