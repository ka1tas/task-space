import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import expenseReducer from './reducers/ExpenseReducer';
import userReducer from './reducers/UserReducer';
import rootSaga from './sagas/rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store

export const store = createStore(
    combineReducers({
        user: userReducer,
        expense: expenseReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)


sagaMiddleware.run(rootSaga)