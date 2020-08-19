import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const PracticeListItem = ({cover2}) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={
          cover2
            ? require('../../assets/img/sample_cover2.png')
            : require('../../assets/img/sample_cover1.png')
        }
        style={styles.img}
      />
      <Text style={styles.title}>
        {cover2 ? 'BTS (방탄소년단) - ON' : '아무것도 아니야 (Nandemonaiya)'}
      </Text>
      <Text style={styles.author}>
        {cover2
          ? 'Piano Cover by Pianella Piano'
          : '너의 이름은 (Kimi no na wa) OST'}
      </Text>
    </View>
  );
};

export default PracticeListItem;

const styles = StyleSheet.create({
  mainContainer: {
    height: 200,
    width: 200,
    marginRight: 30,
  },
  img: {
    height: 200,
    width: 200,
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  author: {
    color: 'rgb(150,150,150);',
    fontSize: 15,
  },
});
