import {appleAuth} from '@invertase/react-native-apple-authentication';

const loginApple = () => {
  appleAuth
    .performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export {loginApple};
