import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

import { BreadCrumb, Button, Colors, LineInput } from '@dm/bigfish';
import { IUpdateREAUserInfo } from '@dm/types';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Translate from 'lib/translate';
import NavActions from 'lib/NavActions';
import CountriesOptions from 'lib/CountriesOptions';

import MainContainer from 'components/MainContainer';
import SelectionInput from 'components/SelectionInput';
import Modal from 'components/Modal';
import RENDocumentModal from './components/RENDocumentModal';

interface DetailedSignUpProps {
    updateUserInfoLoading: boolean;
    updateUserInfoError: string;
    updateUserInfo: (data: IUpdateREAUserInfo) => void;
}

const DetailedSignUp: FunctionComponent<DetailedSignUpProps> = (props: DetailedSignUpProps) => {
    const {
        updateUserInfoLoading,
        updateUserInfoError,
        updateUserInfo,
    } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [renNumber, setRenNumber] = useState('');
    const [companyName, setCompanyName] = useState('');

    // Address
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('1'); // 1 here bcs countries option list starts with 1 (Malaysia)

    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

    const [breadCrumb] = useState(
        [
            {
                label: Translate.t('Profile.ProfileBcMyProfile'),
                onClick: () => NavActions.navToDetailedSignUp(),
            },
        ],
    );

    const submitClickHandler = () => {
        if (
            !firstName
            || !lastName
            || !phoneNumber
            || !renNumber
            || !companyName
            || !address1
            || !address2
            || !city
            || !country
            || !state
            || !postcode
        ) {
            toast.error(Translate.t('Login.LoginEmptyInputError'));
            return;
        }

        const dataToSubmit: IUpdateREAUserInfo = {
            firstName,
            lastName,
            phoneNumber,
            renNumber,
            companyName,
            address: {
                address1,
                address2,
                city,
                country,
                state,
                postcode,
            },
        };

        updateUserInfo(dataToSubmit);
    };

    const renderWelcomeModal = () => {
        return (
            <Modal
                show={isWelcomeModalOpen}
                width='50%'
                closeCursor
                onClickClose={() => setIsWelcomeModalOpen(false)}
            >
                <div
                    style={{
                        padding: '20px',
                    }}
                >
                    <ModalTitle>
                        {Translate.t('Profile.ProfileWelcomeModalTitle')}
                    </ModalTitle>

                    <ModalText>
                        {Translate.t('Profile.ProfileWelcomeModalDesc1')}
                    </ModalText>

                    <ModalText>
                        {Translate.t('Profile.ProfileWelcomeModalDesc2')}
                    </ModalText>

                    <Button
                        label={Translate.t('Profile.ProfileWelcomeModalContinueButton')}
                        onClick={() => setIsWelcomeModalOpen(false)}
                    />
                </div>
            </Modal>
        );
    };

    const renderLoadingOverlay = () => {
        return (
            <Modal
                show={updateUserInfoLoading}
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
                <Container>
                    <Description>{Translate.t('Profile.ProfileDescription')}</Description>
                    <InputsContainer>
                        <SectionTitle>
                            {Translate.t('Profile.ProfileSignupTitle')}
                        </SectionTitle>
                        <DetailsContainer>
                            <LineInput
                                label={Translate.t('Profile.ProfileFirstName')}
                                value={firstName}
                                onChangeText={(e) => setFirstName(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileLastName')}
                                value={lastName}
                                onChangeText={(e) => setLastName(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfilePhoneNumber')}
                                value={phoneNumber}
                                onChangeText={(e) => setPhoneNumber(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileRenNumber')}
                                value={renNumber}
                                onChangeText={(e) => setRenNumber(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileCompanyName')}
                                value={companyName}
                                onChangeText={(e) => setCompanyName(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileAddress1')}
                                value={address1}
                                onChangeText={(e) => setAddress1(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileAddress2')}
                                value={address2}
                                onChangeText={(e) => setAddress2(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfilePostcode')}
                                value={postcode}
                                onChangeText={(e) => setPostcode(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileCity')}
                                value={city}
                                onChangeText={(e) => setCity(e.target.value)}
                            />

                            <LineInput
                                label={Translate.t('Profile.ProfileState')}
                                value={state}
                                onChangeText={(e) => setState(e.target.value)}
                            />

                            <SelectionInput
                                label={Translate.t('Profile.ProfileCountry')}
                                data={CountriesOptions}
                                currentValue={country}
                                onChangeSelection={(e) => setCountry(e.target.value)}
                            />

                        </DetailsContainer>
                    </InputsContainer>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                        }}
                    >
                        {updateUserInfoError && (
                            <div
                                style={{
                                    marginRight: '30px',
                                    color: 'red',
                                }}
                            >
                                {updateUserInfoError}
                            </div>
                        )}
                        <Button
                            label={Translate.t('Profile.ProfileSubmitButton')}
                            onClick={submitClickHandler}
                        />
                    </div>

                </Container>

                {renderWelcomeModal()}
                {renderLoadingOverlay()}

                <RENDocumentModal />
            </MainContainer>
        </>
    );
};

const ModalText = styled.p`
    font-size: 16px;
    font-weight: 400;

    margin-bottom: 20px;
`;

const ModalTitle = styled.p`
    font-size: 20px;
    font-weight: bold;

    margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;

    margin-bottom: 12px;
`;

const DetailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(210px, 1fr) );

    row-gap: 8px;
    column-gap: 56px;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    max-width: 824px;
    
    padding: 40px;

    color: #000;
`;

const Description = styled.p`
    font-size: 14px;
    font-weight: 400;

    margin-bottom: 40px;
`;

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 20px;
    margin-bottom: 16px;

    width: 100%;

    box-sizing: border-box;
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05), 4px 0px 4px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05), 0px -4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
`;

const mapStateToProps = (state: RootState) => ({
    updateUserInfoLoading: Selectors.userUpdateUserInfoAttempting(state),
    updateUserInfoError: Selectors.userUpdateUserInfoError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    updateUserInfo: (data: IUpdateREAUserInfo) => dispatch(Actions.updateUserInfoAttempt(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedSignUp);
