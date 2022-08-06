import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import validator from 'validator';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

import { BreadCrumb, RoundInput, Button, Colors } from '@dm/bigfish';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import NavActions from 'lib/NavActions';
import Translate from 'lib/translate';

import MainContainer from 'components/MainContainer';
import Modal from 'components/Modal';
import { IAuthUserRole } from '@dm/types';

interface SignupProps {
    signupLoading: boolean;
    signupError: string;
    signup: (email: string, password: string, role: number) => void;
}

const SignUp: FunctionComponent<SignupProps> = (props: SignupProps) => {
    const { signupLoading, signupError, signup } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [breadCrumb] = useState([
        {
            label: Translate.t('SignUp.SignUpBcSignUp'),
            onClick: () => { return false; },
        },
        {
            label: Translate.t('SignUp.SignUpBcOwnerSignUp'),
            onClick: () => { return false; },
        },
    ]);

    useEffect(() => {
        setConfirmPasswordError(!validator.equals(password, confirmPassword));
    }, [confirmPassword]);

    const emailChangeHandler = (emailText: string) => {
        setEmailError(!validator.isEmail(emailText));
        setEmail(emailText);
    };

    const passwordChangeHandler = (passwordText: string) => {
        setPassword(passwordText);

        const isPasswordStrong = validator.isStrongPassword(passwordText, { minLength: 5, minLowercase: 1, minUppercase: 1, minSymbols: 1 });

        setPasswordError(!isPasswordStrong);
    };

    const confirmPasswordChangeHandler = (confirmPass: string) => {
        setConfirmPassword(confirmPass);
    };

    const submitClickHandler = () => {
        if (!email || !password || !confirmPassword) {
            toast.error(Translate.t('Login.LoginEmptyInputError'));
            return;
        }

        const userRole = IAuthUserRole.REA;

        signup(email, password, userRole);
    };

    const renderLoadingOverlay = () => {
        return (
            <Modal
                show={signupLoading}
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
                        {Translate.t('SignUp.SignUpTitle')}
                    </FormTitle>

                    <RoundInput
                        label={Translate.t('SignUp.SignUpEmail')}
                        placeholder={Translate.t('SignUp.SignUpPlaceholderEmail')}
                        value={email}
                        onChangeText={(e) => emailChangeHandler(e.target.value)}
                        inputError={emailError}
                        errorText='Please insert a valid email address'
                        style={{
                            marginBottom: '20px',
                        }}
                    />

                    <RoundInput
                        type='password'
                        label={Translate.t('SignUp.SignUpPassword')}
                        placeholder={Translate.t('SignUp.SignUpPlaceholderPassword')}
                        value={password}
                        onChangeText={(e) => passwordChangeHandler(e.target.value)}
                        inputError={passwordError}
                        errorText='Please insert a valid password'
                    />
                    <Text>
                        {Translate.t('SignUp.SignUpPasswordStrengthText')}
                    </Text>

                    <RoundInput
                        type='password'
                        label={Translate.t('SignUp.SignUpConfirmPassword')}
                        placeholder={Translate.t('SignUp.SignUpPlaceholderPassword')}
                        value={confirmPassword}
                        onChangeText={(e) => confirmPasswordChangeHandler(e.target.value)}
                        inputError={confirmPasswordError}
                        errorText='Confirm password does not match with password'
                        style={{
                            marginBottom: '20px',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        {signupError && (
                            <div
                                style={{
                                    marginRight: '20px',
                                    color: 'red',
                                }}
                            >
                                {signupError}
                            </div>
                        )}
                        <Button
                            label={Translate.t('SignUp.SignUpLabel')}
                            onClick={submitClickHandler}
                        />
                    </div>

                    <Text
                        style={{
                            marginTop: '20px',
                            textAlign: 'center',
                        }}
                    >
                        {Translate.t('SignUp.SignUpAlreadyUser')}
                        <TextLink onClick={() => NavActions.navResetToLogin()}>
                            {Translate.t('SignUp.SignUpLogin')}
                        </TextLink>
                    </Text>
                </FormContainer>

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

const Text = styled.p`
    font-size: 12px;
    font-weight: 400;

    color: #696969;

    text-align: left;

    margin-bottom: 20px;
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
    signupLoading: Selectors.authGetSignupAttempting(state),
    signupError: Selectors.authGetSignupError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    signup: (email: string, password: string, role: number) => dispatch(Actions.authSignUpAttempt({ email, password, role })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
