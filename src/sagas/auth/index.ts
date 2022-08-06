import { fork } from 'redux-saga/effects';

import AuthGateway from 'api/Auth';
import { RootSagaReturnType } from 'sagas/types';

import watchLogin from './login';
import watchStartup from './startup';
import watchLogout from './logout';
import watchSignup from './signup';

export default (api: AuthGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchLogin, api);
        yield fork(watchSignup, api);
        yield fork(watchStartup);
        yield fork(watchLogout);
    }

    return {
        rootSaga,
    };
};
