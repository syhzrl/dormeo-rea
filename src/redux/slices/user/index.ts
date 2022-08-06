import { IAuthUserRole, IREAUser, IUpdateREAUserInfo } from '@dm/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetRENUploadUrlActionPayload, UploadRENDocumentActionPayload, UserReduxState } from './types';

const initialState: UserReduxState = {
    actions: {
        getUserInfo: false,
        updateUserInfo: false,
        getRENUploadUrl: false,
        uploadRENDocument: false,
    },
    userInfo: null,
    isRENUploadModalOpen: false,
    RENDocumentUploadURL: '',
    filePath: '',
    error: {
        getUserInfo: '',
        updateUserInfo: '',
        getRENUploadUrl: '',
        uploadRENDocument: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserInfoAttempt: (state) => {
            state.actions.getUserInfo = true;
            state.error.getUserInfo = '';
        },
        getUserInfoSuccess: (state, action: PayloadAction<IREAUser>) => {
            state.actions.getUserInfo = false;
            state.error.getUserInfo = '';

            if (action.payload) {
                state.userInfo = action.payload;
            }
        },
        getUserInfoFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getUserInfo = false;
            if (action.payload) {
                state.error.getUserInfo = action.payload;
            }
        },

        getUserInfoReset: (state) => {
            state.actions.getUserInfo = false;
            state.error.getUserInfo = '';
            state.userInfo = null;
        },

        updateUserInfoAttempt: (state, _action: PayloadAction<IUpdateREAUserInfo>) => {
            state.actions.updateUserInfo = true;
            state.error.updateUserInfo = '';
        },
        updateUserInfoSuccess: (state) => {
            state.actions.updateUserInfo = false;
            state.error.updateUserInfo = '';
        },
        updateUserInfoFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.updateUserInfo = false;
            if (action.payload) {
                state.error.updateUserInfo = action.payload;
            }
        },

        setRENUploadModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isRENUploadModalOpen = action.payload;
        },

        getRENUploadUrlAttempt: (state, _action: GetRENUploadUrlActionPayload) => {
            state.actions.getRENUploadUrl = true;
            state.error.getRENUploadUrl = '';
        },
        getRENUploadUrlSuccess: (state, action: PayloadAction<string>) => {
            state.actions.getRENUploadUrl = false;
            state.error.getRENUploadUrl = '';

            state.RENDocumentUploadURL = action.payload;
        },
        getRENUploadUrlFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getRENUploadUrl = false;
            if (action.payload) {
                state.error.getRENUploadUrl = action.payload;
            }
        },

        uploadRENDocumentAttempt: (state, _action: UploadRENDocumentActionPayload) => {
            state.actions.uploadRENDocument = true;
            state.error.uploadRENDocument = '';
        },
        uploadRENDocumentSuccess: (state) => {
            state.actions.uploadRENDocument = false;
            state.error.uploadRENDocument = '';
        },
        uploadRENDocumentFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.uploadRENDocument = false;
            if (action.payload) {
                state.error.uploadRENDocument = action.payload;
            }
        },
    },
});

export type UserState = typeof initialState;

export default {
    actions: userSlice.actions,
    reducers: userSlice.reducer,
};
