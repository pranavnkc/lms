import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import userData from "./user";
import somedata from "./somedata";
import config from './config';

const rootReducer = combineReducers({
    userData,
    somedata,
    config,
    form,
    toastr,

});

export default rootReducer;
