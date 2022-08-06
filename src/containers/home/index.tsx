import React, { FunctionComponent, useState } from 'react';

import { BreadCrumb } from '@dm/bigfish';

import Translate from 'lib/translate';
import MainContainer from 'components/MainContainer';

const HomeScreen: FunctionComponent = () => {
    // change this homescreen breadcrumb later
    const [breadCrumb] = useState(
        [
            {
                label: Translate.t('Login.LoginBcLogin'),
                onClick: () => { return false; },
            },
            {
                label: Translate.t('Login.LoginBcOwnerLogin'),
                onClick: () => { return false; },
            },
        ],
    );

    return (
        <>
            <BreadCrumb
                backLabel={Translate.t('Ui.UiBack')}
                onBackPressed={() => console.log('lmao')}
                data={breadCrumb}
            />
            <MainContainer>
                <div>
                    HOME SCREEN HELLO
                </div>
            </MainContainer>
        </>
    );
};

export default HomeScreen;
