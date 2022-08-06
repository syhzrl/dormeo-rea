import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginActionPayload, AuthReduxState, SignupActionPayload } from './types';

const initialState: AuthReduxState = {
    actions: {
        login: false,
        startup: true,
        signup: false,
    },
    authToken: '',
    error: {
        login: '',
        startup: '',
        signup: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStartupAttempt: (state) => {
            state.actions.startup = true;
            state.error.startup = '';
        },
        authStartupSuccess: (state) => {
            state.actions.startup = false;
        },
        authStartupFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.startup = false;
            if (action.payload) {
                state.error.startup = action.payload;
            }
        },
        authLoginAttempt: (state, _action: LoginActionPayload) => {
            state.actions.login = true;
            state.error.login = '';
        },
        authLoginSuccess: (state, action: PayloadAction<string>) => {
            state.actions.login = false;
            state.authToken = action.payload;
        },
        authLoginFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.login = false;
            if (action.payload) {
                state.error.login = action.payload;
            }
        },

        authLogout: (state) => {
            state.actions.login = false;
            state.authToken = '';
        },

        authSignUpAttempt: (state, _action: SignupActionPayload) => {
            state.actions.signup = true;
            state.error.signup = '';
        },
        authSignUpSuccess: (state) => {
            state.actions.signup = false;
            state.error.signup = '';
        },
        authSignUpFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.signup = false;
            if (action.payload) {
                state.error.signup = action.payload;
            }
        },
    },
});

export type AuthState = typeof initialState;

export default {
    actions: authSlice.actions,
    reducers: authSlice.reducer,
};
