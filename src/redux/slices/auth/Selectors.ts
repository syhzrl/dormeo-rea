import { AuthState } from '.';

const getStartupAttempting = (state: AuthState): boolean => state.actions.startup || false;
const getStartupError = (state: AuthState): string => state.error.startup || '';

const getLoginAttempting = (state: AuthState): boolean => state.actions.login || false;
const getLoginError = (state: AuthState): string => state.error.login || '';

const getAuthToken = (state: AuthState): string => state.authToken || '';

const getSignupAttempting = (state: AuthState): boolean => state.actions.signup || false;
const getSignupError = (state: AuthState): string => state.error.signup || '';

export default {
    getStartupAttempting,
    getStartupError,

    getLoginAttempting,
    getLoginError,

    getAuthToken,

    getSignupAttempting,
    getSignupError,
};
