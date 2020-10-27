const endpoint = 'http://api.dailybanju.com';

const musicreg = '/musicreg';
const playmeta = '/playmeta';
const search = '/search';
const user = '/user';

const Base = {
  POST_MUSICREG: endpoint + musicreg,
  GET_PLAYMETA: `${endpoint + playmeta}/`,
  GET_SEARCH: `${endpoint + search}/`,
  POST_USER: endpoint + user,
};

export default Base;
