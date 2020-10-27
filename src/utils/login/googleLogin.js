import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '1070023131367-c3qkivj9heir03lou7ffd0n5fj0frmed.apps.googleusercontent.com',
  offlineAccess: false,
});
const fetchGoogleLogin = async () => {
  GoogleSignin.signIn()
    .then(() => {
      GoogleSignin.getTokens()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchGoogleLogin };
