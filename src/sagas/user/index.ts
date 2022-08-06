import { fork } from 'redux-saga/effects';

import UserGateway from 'api/User';

import { RootSagaReturnType } from 'sagas/types';

import watchGetUserInfo from './getUserInfo';
import watchUpdateUserInfo from './updateUserInfo';
import watchGetRENUploadUrl from './getRENUploadUrl';
import watchUploadRENDocument from './uploadRENDocument';

export default (api: UserGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetUserInfo, api);
        yield fork(watchUpdateUserInfo, api);
        yield fork(watchGetRENUploadUrl, api);
        yield fork(watchUploadRENDocument, api);
    }

    return {
        rootSaga,
    };
};
