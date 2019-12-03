import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_ME } from '../actions/';
import LocalStorageService from '../utils/LocalStorageService.js';
const localStorageService = LocalStorageService.getService();

export default function (state = null, action) {
  switch (action.type) {
  case USER_LOGGED_IN:
    return action.payload;
  case USER_LOGGED_OUT:
    localStorageService.clearToken();
    return null;
  case USER_ME:
    localStorageService.setUser(action.payload);
    return {
      ...state,
      user:action.payload,
      token:localStorageService.getAccessToken()
    };
  default:
    return {
      ...state,
      user:localStorageService.getUser(),
      token:localStorageService.getAccessToken()
    };
  }
}
