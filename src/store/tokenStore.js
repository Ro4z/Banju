import { makeObservable, observable, action } from 'mobx';

class TokenStore {
  userToken = '';

  constructor(value) {
    makeObservable(this, {
      userToken: observable,
      setUserToken: action,
      removeUserToken: action,
    });
    this.value = value;
  }

  setUserToken = (token = '') => {
    this.userToken = token;
  };

  removeUserToken = () => {
    this.userToken = '';
  };
}

export default new TokenStore();
