import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthReduxState {
    actions: {
        login: boolean;
        startup: boolean;
        signup: boolean;
    },
    authToken: string;
    error: {
        login: string;
        startup: string;
        signup: string;
    },
}

export type LoginActionPayload = PayloadAction<{
    email: string;
    password: string;
    rememberMe?: boolean;
}>

export type SignupActionPayload = PayloadAction<{
    email: string;
    password: string;
    role: number;
}>;
