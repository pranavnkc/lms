import { toastr } from 'react-redux-toastr';
import API from "../utils/API";
import LocalStorageService from "../utils/LocalStorageService.js";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
const localStorageService = LocalStorageService.getService();

export const someAction = (props) => {
    return (dispatch, getState) => {
        toastr.success('Success', 'You clicked this button');
    };
};

export const login = (props) => {
    return (dispatch, getState) => {
      API.post('auth/', props)
        .then((response)=>{
          localStorageService.setToken(response['data']['token'], response['data']['user']);
          dispatch({
            type: USER_LOGGED_IN,
            payload: { user: response['data']['user'], token: response['data']['token'] }
          });
        }).catch((err)=>{
           dispatch({
            type: USER_LOGGED_IN,
            payload: { error: err.response.data}
          });
        });
    };
};

export const logout = (props) => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGGED_OUT,
            payload: null
        });
        toastr.success('Success', 'You clicked login');
    };
};
