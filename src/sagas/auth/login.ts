import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import NavActions from 'lib/NavActions';

import Actions from 'redux/Actions';
import { LoginActionPayload } from 'redux/slices/auth/types';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';

import Utils from 'lib/Utils';

export default function* watchLogin(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authLoginAttempt', handleLogin, api);
}

function* handleLogin(api: AuthGateway, data: LoginActionPayload) {
    const { email, password, rememberMe } = data.payload;

    const response = yield* call([api, api.login], { email, password, rememberMe });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authLoginFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authLoginSuccess(response.data.token));

        Utils.Auth.storeAuthToken(response.data.token);

        yield put(Actions.getUserInfoAttempt());

        toast.success('Login successful');

        NavActions.navToHome();
    }
}
