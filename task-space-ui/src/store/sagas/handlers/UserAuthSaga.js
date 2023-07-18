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
        const data = yield call(() => logIn(action));
        yield put(logInSuccess(data));
    } catch (err) {
        console.log(err)
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
        yield put(signUpFailure(err.response.data.errorMessage))
    }

}

