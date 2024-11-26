import * as Constants from '../actions/Constants';

const initialState = {
    user: null, authStatus: null,
    errorMessage: "", signupStatus: false
};


export default (state = initialState, action) => {
    switch (action.type) {

        case Constants.SIGN_IN_SUCCESS: {
            return { ...state, ...action.payload }
        }
        case Constants.SIGN_UP_SUCCESS: {
            return { ...state, errorMessage: "", signupStatus: true }
        }
        case Constants.SIGN_UP_FAILURE: {
            return { ...state, errorMessage: action.payload, signupStatus: false }
        }
        case Constants.CLEAR_SIGNUP: {
            return { ...state, errorMessage: "", signupStatus: false }
        }
        case Constants.LOG_OUT: {
            return { ...initialState }
        }
        default:
            return state;
    }
};