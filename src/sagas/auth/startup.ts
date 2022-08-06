import { put, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Utils from 'lib/Utils';
import NavActions from 'lib/NavActions';

export default function* watchStartup(): SagaWatcherReturnType {
    yield takeEvery('auth/authStartupAttempt', handleStartup);
}

function* handleStartup() {
    const authToken = Utils.Auth.getAuthToken();

    if (authToken) {
        yield put(Actions.authLoginSuccess(authToken));
        yield put(Actions.getUserInfoAttempt());
    } else {
        NavActions.navResetToLogin();
    }

    yield put(Actions.authStartupSuccess());
}
