import KakaoLogins from '@react-native-seoul/kakao-login';

const fetchKakaoLogin = () => {
  return new Promise((resolve, reject) => {
    KakaoLogins.login()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { fetchKakaoLogin };
