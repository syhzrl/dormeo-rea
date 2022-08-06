import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { GetRENUploadUrlActionPayload } from 'redux/slices/user/types';

import UserGateway from 'api/User';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetRENUploadUrl(api: UserGateway): SagaWatcherReturnType {
    yield takeEvery('user/getRENUploadUrlAttempt', handleGetRENUploadUrl, api);
}

function* handleGetRENUploadUrl(api: UserGateway, data: GetRENUploadUrlActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const { category, id, name, extension, document } = data.payload;

    const response = yield* call([api, api.getRENUploadUrl], { category, id, name, extension, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getRENUploadUrlFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getRENUploadUrlSuccess(response.data));
        yield put(Actions.uploadRENDocumentAttempt({ preSignedUrl: response.data, document }));
    }
}
