import React, { FunctionComponent, useState, useEffect, useRef, SyntheticEvent } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

import { Colors, RoundInput } from '@dm/bigfish';
import { Category, IREAUser } from '@dm/types';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Translate from 'lib/translate';

import icons from 'assets/icons';

import Modal from 'components/Modal';

interface RENDocumentModalProps {
    isModalOpen: boolean;
    userInfo: IREAUser | null;
    getUrlLoading: boolean;
    getUrlError: string;

    uploadRENDocumentLoading: boolean;

    getUploadUrl: (category: Category, id: string, name: string, extension: string, document: File) => void;
}

const RENDocumentModal: FunctionComponent<RENDocumentModalProps> = (props: RENDocumentModalProps) => {
    const {
        isModalOpen,
        userInfo,
        getUrlLoading,
        getUrlError,

        uploadRENDocumentLoading,

        getUploadUrl,
    } = props;

    const [stateUserId, setStateUserId] = useState('');
    const [documentName, setDocumentName] = useState('');

    useEffect(() => {
        if (userInfo) {
            const { userId } = userInfo;

            setStateUserId(userId);
        }
    }, [userInfo]);

    const fileInput = useRef<HTMLInputElement>(null);

    const onClickHandler = () => {
        if (fileInput.current) {
            fileInput.current.value = '';
            fileInput.current.click();
        }
    };

    const fileSelectHandler = async (event: SyntheticEvent) => {
        if (!documentName) {
            toast.error(Translate.t('SignUp.SignUpRENModalNoDocumentNameError'));
            return;
        }

        const target = event.target as HTMLInputElement;

        let documentExtension = '';

        if (target.files) {
            const doc = target.files[0];

            const { type } = doc;

            switch (type) {
                case 'application/pdf': documentExtension = '.pdf'; break;
                case 'image/jpg': documentExtension = '.jpg'; break;
                case 'image/jpeg': documentExtension = '.jpeg'; break;
                case 'image/png': documentExtension = '.png'; break;
                default:
            }

            getUploadUrl(Category.REN, stateUserId, documentName, documentExtension, doc);
        }
    };

    const renderModalBody = () => {
        if (getUrlLoading || uploadRENDocumentLoading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Oval
                        height={150}
                        width={150}
                        color={Colors.secondary}
                        secondaryColor={Colors.primary}
                    />
                </div>
            );
        }

        return (
            <ContentContainer>
                <InputContainer>
                    <RoundInput
                        label={Translate.t('SignUp.SignUpRENModalInputLabel')}
                        value={documentName}
                        onChangeText={(e) => setDocumentName(e.target.value)}
                        style={{
                            width: '90%',
                        }}
                    />

                    {getUrlError && (
                        <ErrorText>
                            {getUrlError}
                        </ErrorText>
                    )}
                </InputContainer>

                <div>
                    <InputItemContainer>
                        <input
                            type='file'
                            onChange={(e: SyntheticEvent) => fileSelectHandler(e)}
                            ref={fileInput}
                            accept='application/pdf, .jpg, .png, .jpeg'
                            style={{
                                display: 'none',
                            }}
                        />

                        <UploadButton
                            onClick={onClickHandler}
                        >
                            <UploadIcon
                                src={icons.UploadIcon}
                            />

                            <UploadDocumentText>
                                {Translate.t('SignUp.SignUpRENModalUploadButtonLabel')}
                            </UploadDocumentText>
                        </UploadButton>

                    </InputItemContainer>

                    <NoteText>
                        {Translate.t('SignUp.SignUpRENModalUploadDisclaimer')}
                    </NoteText>
                </div>
            </ContentContainer>
        );
    };

    return (
        <Modal
            show={isModalOpen}
            width='50%'
        >
            <Title>
                {Translate.t('SignUp.SignUpRENModalTitle')}
            </Title>

            {renderModalBody()}
        </Modal>
    );
};

const NoteText = styled.p`
    font-size: 16px;
`;

const UploadDocumentText = styled.p`
    margin-left: 20px;
`;

const ErrorText = styled.p`
    color: red;
`;

const InputContainer = styled.div`
    width: 50%;
`;

const ContentContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
`;

const UploadButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: transparent;
    border: none;

    padding: 8px;

    cursor: pointer;

    color: white;
`;

const UploadIcon = styled(SVG)`
`;

const InputItemContainer = styled.div`
    display: flex;
    align-items: center;

    max-width: 160px;
    border-radius: 8px;
    margin-bottom: 8px;

    background-color: #F2B47E;

    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: white;
`;

const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;

const mapStateToProps = (state: RootState) => ({
    isModalOpen: Selectors.userGetIsRENUploadModalOpen(state),
    userInfo: Selectors.userGetUserInfo(state),

    getUrlLoading: Selectors.userGetRENUploadUrlAttempting(state),
    getUrlError: Selectors.userGetRENUploadUrlError(state),

    uploadRENDocumentLoading: Selectors.userUploadRENDocumentAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUploadUrl: (category: Category, id: string, name: string, extension: string, document: File) => dispatch(Actions.getRENUploadUrlAttempt({ category, id, name, extension, document })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RENDocumentModal);
