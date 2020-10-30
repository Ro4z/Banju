const endpoint = 'http://api.dailybanju.com';

const musicreg = '/musicreg';
const playmeta = '/playmeta';
const search = '/search';
const user = '/user';
const popular = '/popular';

const Base = {
  POST_MUSICREG: endpoint + musicreg,
  POST_USER: endpoint + user,
  GET_PLAYMETA: `${endpoint + playmeta}/`,
  GET_SEARCH: `${endpoint + search}/`,
  GET_POPULAR: endpoint + popular,
};

export default Base;
