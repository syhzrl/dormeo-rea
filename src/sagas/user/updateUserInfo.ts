import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';

import { GatewayResponseStatus } from 'api/types/types';

import UserGateway from 'api/User';

import Selectors from 'redux/Selectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUpdateREAUserInfo } from '@dm/types';
import { toast } from 'react-toastify';

export default function* watchUpdateUserInfo(api: UserGateway): SagaWatcherReturnType {
    yield takeEvery('user/updateUserInfoAttempt', handleUpdateUserInfo, api);
}

function* handleUpdateUserInfo(api: UserGateway, data: PayloadAction<IUpdateREAUserInfo>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.updateUserInfo], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.updateUserInfoFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.updateUserInfoSuccess());

        toast.success('User Info Updated');

        yield put(Actions.setRENUploadModalOpen(true));
    }
}
