import { call, put, takeEvery } from 'redux-saga/effects';
import * as Constants from '../../actions/Constants';
import {
    stopLoading, logInSuccess, signUpSuccess, signUpFailure 
} from '../../actions/UserAuthActions';

import {
    logIn, signUp 
} from '../requests/UserAuthRequest';



export function* watchsignIn() {
    yield takeEvery(Constants.SIGN_IN, signIn);
}

function* signIn(action) {
    try {
        const response = yield call(() => logIn(action));
        if(response.status ===200){
            let data = response.data;
            console.log()
            data.authStatus = true;
            console.log(data)
            yield put(logInSuccess(data));
        } 
    } catch (err) {
        if(err.response.status === 401) {
            let data = err.response.data;
            data.authStatus = false;
            yield put(logInSuccess(data));
        }
        console.log(err.response)
    }

}

export function* watchsignUpUser() {
    yield takeEvery(Constants.SIGN_UP, signUpUser);
}

function* signUpUser(action) {
    try {
        const data = yield call(() => signUp(action));
        console.log(data)
        yield put(signUpSuccess(data));
    } catch (err) {
        console.log(err)
        yield put(signUpFailure(err.response.data.errorMessage))
    }

}

