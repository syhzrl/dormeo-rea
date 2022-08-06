import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import authReducer from 'redux/slices/auth';
import uiReducer from 'redux/slices/ui';
import userReducer from 'redux/slices/user';

import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    auth: authReducer.reducers,
    ui: uiReducer.reducers,
    user: userReducer.reducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
            // Ignore these action types
            // This checks for serializable value in redux state or actions for specific action types
            ignoredActions: ['user/getRENUploadUrlAttempt', 'user/uploadRENDocumentAttempt'],
        },
    }).concat(sagaMiddleware, routerMiddleware),
    devTools: process.env.REACT_APP_STAGE !== 'prod',
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
