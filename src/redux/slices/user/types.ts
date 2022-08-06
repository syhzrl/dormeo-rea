import { Category, IREAUser } from '@dm/types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserReduxState {
    actions: {
        getUserInfo: boolean;
        updateUserInfo: boolean;
        getRENUploadUrl: boolean;
        uploadRENDocument: boolean;
    },
    userInfo: IREAUser | null;
    isRENUploadModalOpen: boolean;
    RENDocumentUploadURL: string;
    filePath: string;
    error: {
        getUserInfo: string;
        updateUserInfo: string;
        getRENUploadUrl: string;
        uploadRENDocument: string;
    },
}

export type GetRENUploadUrlActionPayload = PayloadAction<{
    category: Category;
    id: string;
    name: string;
    extension: string;
    document: File;
}>;

export type UploadRENDocumentActionPayload = PayloadAction<{
    document: File,
    preSignedUrl: string;
}>;
