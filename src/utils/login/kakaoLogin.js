import KakaoLogins from '@react-native-seoul/kakao-login';

const loginKakao = () => {
  console.log('qqqq');
  KakaoLogins.login()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export {loginKakao};
