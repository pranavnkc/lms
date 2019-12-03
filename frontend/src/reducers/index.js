import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import userData from "./user";
import somedata from "./somedata";

const rootReducer = combineReducers({
    userData,
    somedata,
    form,
    toastr,
});

export default rootReducer;
