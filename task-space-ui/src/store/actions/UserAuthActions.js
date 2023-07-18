import * as Constants from './Constants';


//ACTIVATE_LOADING
export const activateLoading = () => {
    return {
        type: Constants.ACTIVATE_LOADING
    }
}

//STOP_LOADING
export const stopLoading = () => {
    return {
        type: Constants.STOP_LOADING
    }
}


//SIGN_IN
export const logIn = (data) => {
    return {
        type: Constants.SIGN_IN,
        payload: data
    }
}

//LOG_OUT
export const logOut = () => {
    return {
        type: Constants.LOG_OUT
    }
}

//SIGN_IN_SUCCESS
export const logInSuccess = (data) => {
    return {
        type: Constants.SIGN_IN_SUCCESS,
        payload: data
    }
}

//SIGN_IN_FAILURE
export const logInFailure = (data) => {
    return {
        type: Constants.SIGN_IN_FAILURE,
        payload: data
    }
}


//SIGN_UP
export const signUp = (data) => {
    return {
        type: Constants.SIGN_UP,
        payload: data
    }
}



//SIGN_UP_FAILURE
export const signUpFailure = (data) => {
    return {
        type: Constants.SIGN_UP_FAILURE,
        payload: data
    }
}


//SIGN_UP_SUCCESS
export const signUpSuccess = (data) => {
    return {
        type: Constants.SIGN_UP_SUCCESS,
        payload: data
    }
}

//CLEAR_SIGNUP
export const clearSignup = () => {
    return {
        type: Constants.CLEAR_SIGNUP,
    }
}


