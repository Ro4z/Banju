import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {withTheme} from 'react-native-elements';

const ResultListItem = ({cover2, navigation, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => navigation.navigate('Practice')}>
      <Image
        source={
          cover2
            ? require('../../assets/img/sample_cover2.png')
            : require('../../assets/img/sample_cover1.png')
        }
        style={styles.img}
      />
      <View>
        <Text style={styles.title}>
          {cover2 ? 'BTS (방탄소년단) - ON' : '아무것도 아니야 (Nandemonaiya)'}
        </Text>
        <Text style={styles.author}>
          {cover2
            ? 'Piano Cover by Pianella Piano'
            : '너의 이름은 (Kimi no na wa) OST'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Item = (props) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <Image source={{uri: props.uri}} style={styles.img} />
      <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.author}>{props.author}</Text>
      </View>
    </TouchableOpacity>
  );
};
export {Item};
export default ResultListItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginRight: 30,
    alignItems: 'center',
  },
  img: {width: 220, height: 220},
  title: {
    color: 'white',
    fontSize: 22,
  },
  author: {
    color: 'rgb(150,150,150);',
    fontSize: 15,
  },
});
