import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BACKGROUND_COLOR} from '@constants/color';
import Icon from '@assets/icon/Ionicons';
import {colors} from '@constants/color';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 70,
      }}>
      <Icon
        name="ios-chevron-back"
        style={{color: colors.grey85Text2, fontSize: 24}}
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'NanumSquareEB',
          color: colors.grey85Text2,
        }}>
        로그인
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'NanumSquareEB',
            color: colors.neon2,
          }}>
          완료
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  return (
    <View style={styles.mainContainer}>
      <Header />

      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>NAME</Text>
          <Text style={styles.text2}>이름</Text>
        </View>
        <TextInput style={styles.textInput} value="김반주" />
      </View>

      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>EMAIL</Text>
          <Text style={styles.text2}>이메일</Text>
        </View>
        <TextInput style={styles.textInput} value="fortebanju@banju.com" />
      </View>

      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>PASSWORD</Text>
          <Text style={styles.text2}>비밀번호</Text>
        </View>
        <TextInput
          style={[styles.textInput, {fontSize: 28, marginBottom: 0}]}
          value="123456"
          secureTextEntry={true}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  subContainer: {
    width: '88%',
    borderBottomWidth: 1,
    borderColor: colors.grey152,
    marginBottom: 40,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //backgroundColor: 'green',
  },
  text1: {
    fontFamily: 'OpenSauceSans-Regular',
    fontSize: 16,
    fontWeight: '800',
    color: colors.grey85Text2,
  },
  text2: {
    fontFamily: 'NanumSquareR',
    fontSize: 15,
    letterSpacing: -0.53,
    color: colors.grey30Dimmed2,
    marginLeft: 7,
  },
  textInput: {
    width: '100%',
    fontFamily: 'NanumSquareR',
    fontSize: 16,
    color: colors.grey85Text2,
    marginTop: 25,
    marginBottom: 10,
  },
});
