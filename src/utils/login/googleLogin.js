import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '1070023131367-c3qkivj9heir03lou7ffd0n5fj0frmed.apps.googleusercontent.com',
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

export { fetchGoogleLogin };
