import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '135334536032-6j9qroe5upup9fc09joe247hf7pb0reu.apps.googleusercontent.com',
  offlineAccess: false,
});
const fetchGoogleLogin = async () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.signIn()
      .then(() => {
        GoogleSignin.getTokens()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {fetchGoogleLogin};
