import { all } from 'redux-saga/effects';
import {
    watchsignUpUser, watchsignIn
} from './handlers/UserAuthSaga';

export default function* rootSaga() {
    yield all([
        watchsignUpUser(),
        watchsignIn()
    ])
}