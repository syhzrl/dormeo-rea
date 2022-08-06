import { takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Utils from 'lib/Utils';
import NavActions from 'lib/NavActions';
import { toast } from 'react-toastify';

export default function* watchLogout(): SagaWatcherReturnType {
    yield takeEvery('auth/authLogout', handleLogout);
}

function handleLogout() {
    Utils.Auth.clearAuthToken();
    NavActions.navResetToLogin();
    toast.success('Logged Out Successfully');
}
