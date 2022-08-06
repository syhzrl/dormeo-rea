import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import { GatewayResponseStatus } from 'api/types/types';

import UserGateway from 'api/User';

import Selectors from 'redux/Selectors';

export default function* watchGetUserInfo(api: UserGateway): SagaWatcherReturnType {
    yield takeEvery('user/getUserInfoAttempt', handleGetUserInfo, api);
}

function* handleGetUserInfo(api: UserGateway) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getUserInfo], { authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getUserInfoFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getUserInfoSuccess(response.data));
    }
}
