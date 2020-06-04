import Api from './api';

export default {
  login(data) {
    return Api().post('login', data);
  },
};
