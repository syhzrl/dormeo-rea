import React, { FunctionComponent, useEffect } from 'react';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import { IREAUser } from '@dm/types';

import { getUserLanguage, setUserLanguage } from 'lib/translate';

import Routes from 'navigation/Routes';
import NavActions from 'lib/NavActions';
import Modal from 'components/Modal';
import { Oval } from 'react-loader-spinner';
import { Colors } from '@dm/bigfish';
import MainContainer from 'components/MainContainer';

interface FullProps {
    loading: boolean;
    error: string;
    userInfo: IREAUser | null;

    getUserInfoLoading: boolean;

    startup: () => void;
    setLanguage: (language: string) => void;
    setUploadRENDocumentModalOpen: (state: boolean) => void;
}

const Full: FunctionComponent<FullProps> = (props: FullProps) => {
    const {
        loading,
        error,
        userInfo,
        getUserInfoLoading,
        startup,
        setLanguage,
        setUploadRENDocumentModalOpen,
    } = props;

    useEffect(() => {
        startup();

        const currentLanguage = getUserLanguage();
        setUserLanguage(currentLanguage);
        setLanguage(currentLanguage);
    }, []);

    useEffect(() => {
        if (userInfo) {
            const { isFirstSignUp, renFileUrl } = userInfo;

            if (isFirstSignUp) {
                NavActions.navToDetailedSignUp();
                return;
            }

            if (!renFileUrl.length) {
                NavActions.navToDetailedSignUp();
                setUploadRENDocumentModalOpen(true);
            }
        }
    }, [userInfo]);

    if (error) {
        // nav to error page
    }

    if (loading || getUserInfoLoading) {
        return (
            <MainContainer>
                <Modal
                    show
                    width='50%'
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '20px',
                        }}
                    >
                        <Oval
                            height={200}
                            width={200}
                            color={Colors.secondary}
                            secondaryColor={Colors.primary}
                        />
                    </div>
                </Modal>
            </MainContainer>

        );
    }

    return (
        <Routes />
    );
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.authGetStartupAttempting(state),
    error: Selectors.authGetStartupError(state),
    userInfo: Selectors.userGetUserInfo(state),

    getUserInfoLoading: Selectors.userGetUserInfoAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    startup: () => dispatch(Actions.authStartupAttempt()),
    setLanguage: (language: string) => dispatch(Actions.setLanguage(language)),
    setUploadRENDocumentModalOpen: (state: boolean) => dispatch(Actions.setRENUploadModalOpen(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Full);
