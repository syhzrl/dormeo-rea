import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import NavActions from 'lib/NavActions';

import Actions from 'redux/Actions';
import { SignupActionPayload } from 'redux/slices/auth/types';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';

export default function* watchSignup(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authSignUpAttempt', handleSignup, api);
}

function* handleSignup(api: AuthGateway, data: SignupActionPayload) {
    const response = yield* call([api, api.signup], data.payload);

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authSignUpFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authSignUpSuccess());

        toast.success('Sign up successful');

        NavActions.navResetToLogin();
    }
}
