import { IREAUser } from '@dm/types';
import { UserState } from '.';

const getUserInfoAttempting = (state: UserState): boolean => state.actions.getUserInfo || false;
const getUserInfoError = (state: UserState): string => state.error.getUserInfo || '';

const getUserInfo = (state: UserState): IREAUser | null => state.userInfo || null;

const updateUserInfoAttempting = (state: UserState): boolean => state.actions.updateUserInfo || false;
const updateUserInfoError = (state: UserState): string => state.error.updateUserInfo || '';

const getIsRENUploadModalOpen = (state: UserState): boolean => state.isRENUploadModalOpen || false;

const getREAUploadUrlAttempting = (state: UserState): boolean => state.actions.getRENUploadUrl || false;
const getREAUploadUrlError = (state: UserState): string => state.error.getRENUploadUrl || '';

const getREAUploadUrl = (state: UserState): string => state.RENDocumentUploadURL || '';

const uploadRENDocumentAttempting = (state: UserState): boolean => state.actions.uploadRENDocument || false;
const uploadRENDocumentError = (state: UserState): string => state.error.uploadRENDocument || '';

export default {
    getUserInfoAttempting,
    getUserInfoError,

    getUserInfo,

    updateUserInfoAttempting,
    updateUserInfoError,

    getIsRENUploadModalOpen,

    getREAUploadUrlAttempting,
    getREAUploadUrlError,

    getREAUploadUrl,

    uploadRENDocumentAttempting,
    uploadRENDocumentError,
};
