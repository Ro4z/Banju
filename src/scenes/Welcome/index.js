import React, { useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

import { BACKGROUND_COLOR, colors } from '@constants/color';
import { fetchKakaoLogin } from '@utils/login/kakaoLogin';
import { fetchGoogleLogin } from '@utils/login/googleLogin';
import { fetchAppleLogin } from '@utils/login/appleLogin';
import TokenStore from '@store/tokenStore';
import Base from '@base';

const Welcome = observer(({ navigation }) => {
  const loginWithApple = () => {
    fetchAppleLogin()
      .then(async (res) => {
        await AsyncStorage.setItem('userToken', res.authorizationCode);
        navigation.navigate('Main');
        console.log('asdf');
        // axios
        //   .post(Base.POST_USER, {
        //     type: 'apple',
        //     accessToken: res.identityToken,
        //   })
        //   .then((resp) => {
        //     console.log('APPLE');
        //     TokenStore.setUserToken(resp.data.token);

        //     navigation.navigate('Main');
        //   })
        //   .catch((error) => {
        //     Alert.alert('Sorry2', '로그인 도중 문제가 발생하였습니다.');
        //   });
      })
      .catch((err) => {
        if (err.message === 'email not found') {
          Alert.alert('Sorry', '저희 서비스를 이용하시기 위해서는\n이메일을 "공유"하셔야 합니다.');
          return;
        }
        if (err.code === '1001') return; // cancel login
        Alert.alert('Sorry', '로그인 도중 문제가 발생하였습니다.');
      });
  };

  const loginWithKakao = () => {
    fetchKakaoLogin()
      .then(async (res) => {
        await AsyncStorage.setItem('userToken', res.accessToken);
        navigation.navigate('Main');
        // console.log('res.accessToken :>> ', res.accessToken);
        // axios
        //   .post(Base.POST_USER, {
        //     type: 'kakao',
        //     accessToken: res.accessToken,
        //   })
        //   .then((resp) => {
        //     TokenStore.setUserToken(resp.data.token);
        //     AsyncStorage.setItem('userToken', resp.data.token);
        //     navigation.navigate('Main');
        //   })
        //   .catch((err) => {
        //     console.log(err.request);
        //     Alert.alert('Sorry1', '로그인 도중 문제가 발생하였습니다.');
        //   });
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert('Sorry2', '로그인 도중 문제가 발생하였습니다.');
      });
  };

  const loginWithGoogle = () => {
    fetchGoogleLogin()
      .then(async (res) => {
        await AsyncStorage.setItem('userToken', res.accessToken);
        navigation.navigate('Main');
        // axios
        //   .post(Base.POST_USER, {
        //     type: 'google',
        //     accessToken: res.accessToken,
        //   })
        //   .then((resp) => {
        //     TokenStore.setUserToken(resp.data.token);
        //     AsyncStorage.setItem('userToken', resp.data.token);
        //     navigation.navigate('Main');
        //   })
        //   .catch(() => {
        //     Alert.alert('Sorry2', '로그인 도중 문제가 발생하였습니다.');
        //   });
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert('Sorry', '로그인 도중 문제가 발생하였습니다.');
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={require('@assets/img/app_logo.png')} style={styles.mainLogo} />

      {/* background text */}
      <View style={styles.subContainer_1}>
        <Text style={[styles.backgroundText, { opacity: 0.2 }]}>B</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.backgroundText, { opacity: 0.6 }]}>C</Text>
          <Text style={[styles.backgroundText, { opacity: 0.6, lineHeight: 25, fontSize: 15 }]}>
            #
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.backgroundText]}>A</Text>
          <Text style={[styles.backgroundText, { lineHeight: 25, fontSize: 15 }]}>maj</Text>
        </View>
        <Text style={[styles.backgroundText, { opacity: 0.6 }]}>G</Text>
        <Text style={[styles.backgroundText, { opacity: 0.2 }]}>G</Text>
      </View>

      <Text style={styles.text_1}>어떤 곡이든 코드 반주로!</Text>
      <Text style={styles.text_2}>
        BANJU는 내가 방금 들은곡, 원하는 곡을{'\n'}코드반주로 바꾸어주는 서비스입니다.
      </Text>

      {/* Social Login Buttons */}

      {/* APPLE LOGIN */}
      <TouchableOpacity style={styles.loginBtn} onPress={loginWithApple}>
        <View style={styles.loginLogoFrame}>
          <Image style={styles.loginLogo} source={require('@assets/img/logo_apple.png')} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.loginBtnText}>CONTINUE WITH APPLE</Text>
        </View>
        <View style={[styles.loginLogoFrame, { backgroundColor: null }]} />
      </TouchableOpacity>

      {/* GOOGLE LOGIN */}
      <TouchableOpacity style={styles.loginBtn} onPress={loginWithGoogle}>
        <View style={styles.loginLogoFrame}>
          <Image style={styles.loginLogo} source={require('@assets/img/logo_google.png')} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.loginBtnText}>CONTINUE WITH GOOGLE</Text>
        </View>
        <View style={[styles.loginLogoFrame, { backgroundColor: null }]} />
      </TouchableOpacity>

      {/* KAKAO LOGIN */}
      <TouchableOpacity style={styles.loginBtn} onPress={loginWithKakao}>
        <View style={[styles.loginLogoFrame, { backgroundColor: 'rgb(254,233,76)' }]}>
          {/* TODO: amend kakao logo */}
          <Image
            style={[styles.loginLogo, { height: 21, width: 21 }]}
            source={require('@assets/img/logo_kakao.png')}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.loginBtnText}>CONTINUE WITH KAKAO</Text>
        </View>
        <View style={[styles.loginLogoFrame, { backgroundColor: null }]} />
      </TouchableOpacity>

      {/* TODO: 이용 약관 link 추가하기 */}
      <TouchableOpacity onPress={null}>
        <Text style={styles.termsText}>Terms and conditions</Text>
      </TouchableOpacity>
    </View>
  );
});

Welcome.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Welcome;

const styles = EStyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  subContainer_1: {
    flexDirection: 'row',
    width: '110%',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginBottom: '12%',
    marginLeft: 20,
  },
  subContainer_2: {},
  text_1: {
    color: colors.white2,
    fontSize: '26rem',
    fontFamily: 'NanumSquareEB',
    letterSpacing: -0.72,
  },
  text_2: {
    color: 'rgb(203,203,203)',
    fontFamily: 'NanumSquareR',
    fontSize: '15rem',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.65,
    marginTop: 10,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.grey152,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 7,
  },
  loginLogoFrame: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: colors.grey952,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: {
    height: 18,
    width: 18,
  },
  loginBtnText: {
    fontFamily: 'OpenSauceSans-Regular',
    fontSize: '11rem',
    fontWeight: '600',
    color: colors.grey85Text2,
  },
  termsText: {
    fontFamily: 'OpenSauceSans-Regular',
    fontSize: '13rem',
    color: 'rgb(75,75,75)',
    letterSpacing: -0.48,
    fontWeight: '300',
    textDecorationLine: 'underline',
    marginTop: '20rem',
  },
  mainLogo: {
    width: 140,
    resizeMode: 'contain',
    marginTop: '90rem',
  },
  backgroundText: {
    fontSize: '60rem',
    fontFamily: 'OpenSauceSans-Bold',
    color: colors.neonText2,
  },
});
