/* eslint-disable import/prefer-default-export */
import {appleAuth} from '@invertase/react-native-apple-authentication';

const fetchAppleLogin = () => {
  return new Promise((resolve, reject) => {
    appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {fetchAppleLogin};
