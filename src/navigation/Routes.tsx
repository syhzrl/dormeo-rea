import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { history } from 'redux/store';

import LoginScreen from 'containers/auth/Login';
import SignUpScreen from 'containers/auth/SignUp';
import DetailedSignUpScreen from 'containers/auth/DetailedSignUp';

import HomeScreen from 'containers/home';

import PrivateRoute from './PrivateRoutes';

const PrivateBucket: FunctionComponent = () => {
    return (
        <Route path='/' element={<PrivateRoute />}>
            <Route index element={<HomeScreen />} />
            <Route path='/dashboard' element={<HomeScreen />} />
        </Route>
    );
};

const NavRoutes: FunctionComponent = (props) => {
    return (
        <Router history={history}>
            <Routes>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/signup' element={<SignUpScreen />} />
                <Route path='/detailedSignup' element={<DetailedSignUpScreen />} />

                <Route path='*' element={<Navigate replace to='/' />} />
                {PrivateBucket(props)}
            </Routes>
        </Router>
    );
};

export default NavRoutes;
