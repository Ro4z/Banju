import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { colors } from '@constants/color';
import EStyleSheet from 'react-native-extended-stylesheet';

import Item from './PopularListItem';

const DATA = [1, 2, 3, 4, 5, 6, 7];

const PopularList = ({ data, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        data={data}
        renderItem={({ index, item }) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.number}>{index + 1}</Text>
              <Item data={item} navigation={navigation} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default PopularList;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 5,
  },
  number: {
    color: colors.neonText2,
    fontFamily: 'OpenSauceSans-Black',
    fontSize: 26,
    marginTop: '10rem',
    marginRight: '4rem',
  },
});
