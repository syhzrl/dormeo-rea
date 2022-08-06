import React from 'react';

import Full from 'containers/Full';

import { Footer } from '@dm/bigfish';

import Header from 'components/Header';
import GlobalStyle from 'components/GlobalStyle';
import CustomToastContainer from 'components/ToastContainer';

import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
    return (
        <div className='App'>
            <GlobalStyle />
            <Header />
            <Full />
            <Footer />
            <CustomToastContainer />
        </div>
    );
};

export default App;
