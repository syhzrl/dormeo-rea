import { put, call, takeEvery } from 'typed-redux-saga/macro';
import { toast } from 'react-toastify';
import { create } from 'apisauce';
import UserGateway from 'api/User';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import { UploadRENDocumentActionPayload } from 'redux/slices/user/types';

import NavActions from 'lib/NavActions';
import Translate from 'lib/translate';

export default function* watchUploadRENDocument(api: UserGateway): SagaWatcherReturnType {
    yield takeEvery('user/uploadRENDocumentAttempt', handleUploadRENDocument, api);
}

function* handleUploadRENDocument(api: UserGateway, data: UploadRENDocumentActionPayload) {
    const { preSignedUrl, document } = data.payload;

    const formData = new FormData();
    formData.append('file', document);

    const s3Api = create({
        baseURL: preSignedUrl,
        headers: {
            'content-type': 'multipart/form-data',
        },
    });

    const response = yield* call(s3Api.put, '', formData);

    if (!response.ok) {
        yield put(Actions.uploadRENDocumentFailure(Translate.t('Error.GeneralError')));
        toast.error(Translate.t('Error.GeneralError'));
        return;
    }

    yield put(Actions.uploadRENDocumentSuccess());
    NavActions.navToHome();
    toast.success(Translate.t('SignUp.SignUpRENDocumentUploadedMessage'));
}
