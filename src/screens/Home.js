import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

import TodayList from '../components/home/TodayList';
import TrendList from '../components/home/TrendList';
import Header from '../components/structure/Header';
import {HEIGHT} from '../constants/dimensions';
import Icon from '../assets/icon/Ionicons';
import {BACKGROUND_COLOR} from '../constants/color';

const Home = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('../assets/img/background_home.jpg')}
        blurRadius={10}>
        <Header />
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate('UserInfo')}>
            <Icon name="ios-person-circle-outline" style={styles.profile} />
          </TouchableOpacity>
          <Text style={styles.text1}>안녕하세요 성환님!</Text>
          <Text style={styles.text2}>
            오늘은 어떤 연주로 하루를 마무리 해볼까요?
          </Text>
          <Button
            title="연습 시작"
            buttonStyle={styles.button}
            onPress={() => {
              navigation.navigate('Practice');
            }}
          />
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TodayList />
        <TrendList />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  imgBackground: {width: '100%', height: HEIGHT / 2},
  button: {
    backgroundColor: '#ff7700',
    width: 130,
    marginTop: 30,
  },
  subContainer: {
    alignItems: 'center',
  },
  profile: {
    color: '#BBB',
    fontSize: 200,
  },
  text1: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
  },
});
