import { IREAUser } from '@dm/types';
import auth from 'redux/slices/auth/Selectors';
import ui from 'redux/slices/ui/selectors';
import user from 'redux/slices/user/selectors';

import { RootState } from './store';

// Auth
const authGetStartupAttempting = (state: RootState): boolean => auth.getStartupAttempting(state.auth);
const authGetStartupError = (state: RootState): string => auth.getStartupError(state.auth);

const authGetLoginAttempting = (state: RootState): boolean => auth.getLoginAttempting(state.auth);
const authGetLoginError = (state: RootState): string => auth.getLoginError(state.auth);

const authGetAuthToken = (state: RootState): string => auth.getAuthToken(state.auth);

const authGetSignupAttempting = (state: RootState): boolean => auth.getSignupAttempting(state.auth);
const authGetSignupError = (state: RootState): string => auth.getSignupError(state.auth);

// UI
const getUiSelectedLanguage = (state: RootState): string => ui.getSelectedLanguage(state.ui);
const getUiSelectedTabView = (state: RootState): string => ui.getSelectedTabView(state.ui);
const getUiModulesCreateModal = (state: RootState): boolean => ui.getModulesCreateModal(state.ui);

// User
const userGetUserInfoAttempting = (state: RootState): boolean => user.getUserInfoAttempting(state.user);
const userGetUserInfoError = (state: RootState): string => user.getUserInfoError(state.user);

const userGetUserInfo = (state: RootState): IREAUser | null => user.getUserInfo(state.user);

const userUpdateUserInfoAttempting = (state: RootState): boolean => user.updateUserInfoAttempting(state.user);
const userUpdateUserInfoError = (state: RootState): string => user.updateUserInfoError(state.user);

const userGetIsRENUploadModalOpen = (state: RootState): boolean => user.getIsRENUploadModalOpen(state.user);

const userGetRENUploadUrlAttempting = (state: RootState): boolean => user.getREAUploadUrlAttempting(state.user);
const userGetRENUploadUrlError = (state: RootState): string => user.getREAUploadUrlError(state.user);

const userGetRENUploadUrl = (state: RootState): string => user.getREAUploadUrl(state.user);

const userUploadRENDocumentAttempting = (state: RootState): boolean => user.uploadRENDocumentAttempting(state.user);
const userUploadRENDocumentError = (state: RootState): string => user.uploadRENDocumentError(state.user);

export default {
    // Auth
    authGetStartupAttempting,
    authGetStartupError,

    authGetLoginAttempting,
    authGetLoginError,

    authGetAuthToken,

    authGetSignupAttempting,
    authGetSignupError,

    // UI
    getUiSelectedLanguage,
    getUiSelectedTabView,
    getUiModulesCreateModal,

    // User
    userGetUserInfoAttempting,
    userGetUserInfoError,
    userGetUserInfo,

    userUpdateUserInfoAttempting,
    userUpdateUserInfoError,

    userGetIsRENUploadModalOpen,

    userGetRENUploadUrlAttempting,
    userGetRENUploadUrlError,

    userGetRENUploadUrl,

    userUploadRENDocumentAttempting,
    userUploadRENDocumentError,
};
