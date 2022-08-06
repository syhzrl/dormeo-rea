import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { RoundInput, Button, BreadCrumb, Checkbox, Colors } from '@dm/bigfish';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';

import Translate from 'lib/translate';
import NavActions from 'lib/NavActions';

import MainContainer from 'components/MainContainer';
import Modal from 'components/Modal';

interface LoginProps {
    loginLoading: boolean;
    loginError: string;
    login: (email: string, password: string, rememberMe?: boolean) => void;
}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
    const { loginLoading, loginError, login } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [breadCrumb] = useState(
        [
            {
                label: Translate.t('Login.LoginBcLogin'),
                onClick: () => NavActions.navToSignUp(),
            },
            {
                label: Translate.t('Login.LoginBcOwnerLogin'),
                onClick: () => { return false; },
            },
        ],
    );

    const onChangeEmailHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setEmail(target.value);
    };

    const onChangePasswordHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    };

    const loginClickHandler = () => {
        if (!email || !password) {
            toast.error(Translate.t('Login.LoginEmptyInputError'));
            return;
        }

        login(email, password, rememberMe);
    };

    const renderLoadingOverlay = () => {
        return (
            <Modal
                show={loginLoading}
                width='50%'
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
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
        );
    };

    return (
        <>
            <BreadCrumb
                backLabel={Translate.t('Ui.UiBack')}
                onBackPressed={() => NavActions.navBack()}
                data={breadCrumb}
            />
            <MainContainer>
                <FormContainer>
                    <FormTitle>
                        {Translate.t('Login.LoginOwnerLogin')}
                    </FormTitle>

                    <RoundInput
                        label={Translate.t('Login.LoginEmail')}
                        placeholder={Translate.t('Login.LoginPlaceholder')}
                        value={email}
                        onChangeText={onChangeEmailHandler}
                        style={{
                            marginBottom: '20px',
                        }}
                    />

                    <RoundInput
                        type='password'
                        label={Translate.t('Login.LoginPassword')}
                        placeholder={Translate.t('Login.LoginPlaceholderPassword')}
                        value={password}
                        onChangeText={onChangePasswordHandler}
                        style={{
                            marginBottom: '20px',
                        }}
                    />

                    <Checkbox
                        label={Translate.t('Login.LoginRememberMe')}
                        checked={rememberMe}
                        onClickCheckbox={() => setRememberMe(!rememberMe)}
                    />

                    <SubmitButtonContainer>
                        <Button
                            label={Translate.t('Login.LoginLabel')}
                            onClick={loginClickHandler}
                        />
                    </SubmitButtonContainer>

                    { loginError && (
                        <div
                            style={{
                                color: 'red',
                            }}
                        >
                            {loginError}
                        </div>
                    )}

                </FormContainer>

                <Text style={{ marginTop: '20px', textAlign: 'center' }}>
                    {Translate.t('Login.LoginNewTo')}
                    <TextLink onClick={() => NavActions.navToSignUp()}>
                        {Translate.t('Login.LoginJoinNow')}
                    </TextLink>
                </Text>

                {renderLoadingOverlay()}
            </MainContainer>
        </>
    );
};

const FormContainer = styled.div`
    margin: 0 auto;
    margin-top: 80px;
    padding: 20px;

    max-width: 554px;

    box-sizing: border-box;
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05), 4px 0px 4px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05), 0px -4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
`;

const FormTitle = styled.h3`
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;

    margin-bottom: 28px;
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Text = styled.p`
    font-size: 12px;
    line-height: 14px;
    font-weight: 400;

    color: #696969;
`;

const TextLink = styled.a`
    font-size: inherit;
    line-height: inherit;
    color: #2F80ED;

    cursor: pointer;

    &:hover{
        color: #2f81edd1;
    }

    user-select: none;
`;

const mapStateToProps = (state: RootState) => ({
    loginLoading: Selectors.authGetLoginAttempting(state),
    loginError: Selectors.authGetLoginError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (email: string, password: string, rememberMe?: boolean) => dispatch(Actions.authLoginAttempt({ email, password, rememberMe })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
