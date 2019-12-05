import { CONFIG_FETCHED } from '../actions/';
export default function (state, action) {
    switch (action.type) {
        case CONFIG_FETCHED:
            return {
                ...state,
                groups:action.payload
            };
        default:
            return state || {
                groups:[]
            }
    }
}
