import { goBack, push, replace } from 'redux-first-history';

import { store } from 'redux/store';

const navPush = (routeName: string) => {
    store.dispatch(push(routeName));
};

const navReplace = (routeName: string) => {
    store.dispatch(replace(routeName));
};

const navBack = (): void => {
    store.dispatch(goBack());
};

const navResetToLogin = (): void => navReplace('/login');

const navToHome = (): void => navPush('/');

const navToSignUp = (): void => navPush('/signup');

const navToDetailedSignUp = (): void => navPush('/detailedSignup');

export default {
    navResetToLogin,

    navToHome,
    navBack,

    navToSignUp,
    navToDetailedSignUp,
};
