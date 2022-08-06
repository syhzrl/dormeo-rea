import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState, AppDispatch } from 'redux/store';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import Translate, { setUserLanguage } from 'lib/translate';
import NavActions from 'lib/NavActions';

import { CompanyLogo, TabView, SearchBar, LanguageSwitcher, ProfileButton, DropdownProfile } from '@dm/bigfish';

import Icons from 'assets/icons';

interface HeaderProps {
    isAuthenticated: string;
    selectedLanguage: string;
    selectedTabView: string;
    setLanguage: (language: string) => void;
    setTabView: (tabView: string) => void;
    logout: () => void;
}

const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    const {
        isAuthenticated,
        selectedLanguage,
        selectedTabView,
        setLanguage,
        setTabView,
        logout,
    } = props;

    const [profileName, setProfileName] = useState('');
    const [onProfileDropdown, setOnProfileDropdown] = useState(false);

    const [profileDropdown] = useState([
        {
            text: Translate.t('Header.HeaderMyProfile'),
        },
        {
            text: Translate.t('Header.HeaderMyProperties'),
        },
        {
            text: Translate.t('Header.HeaderSettings'),
        },
        {
            text: Translate.t('Header.HeaderHelpCenter'),
        },
        {
            text: Translate.t('Header.HeaderLogOut'),
            onClick: () => { logout(); setOnProfileDropdown(false); },
        },
    ]);

    const [tabViewData] = useState([
        {
            text: 'dashboard',
            onClickTabView: () => {
                setTabView('dashboard');
                // NavActions.navToDashboard();
            },
        },
        {
            text: 'listings',
            onClickTabView: () => {
                setTabView('listings');
                // NavActions.navToListings();
            },
        },
        {
            text: 'notifications',
            onClickTabView: () => {
                setTabView('notifications');
                // NavActions.navToNotifications();
            },
        },
        {
            text: 'reports',
            onClickTabView: () => {
                setTabView('reports');
                // NavActions.navToReports();
            },
        },
        {
            text: 'approvals',
            onClickTabView: () => {
                setTabView('approvals');
                // NavActions.navToApprovals();
            },
        },
    ]);

    const [languageSwitcherData] = useState([
        {
            displayText: 'En',
            language: 'en',
            onClickSetLang: () => {
                changeLanguage('en');
            },
        },
        {
            displayText: 'Bm',
            language: 'ms',
            onClickSetLang: () => {
                changeLanguage('ms');
            },
        },
        {
            displayText: '中文',
            language: 'zh',
            onClickSetLang: () => {
                changeLanguage('zh');
            },
        },
    ]);

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        setUserLanguage(lang);
        window.location.reload();
    };

    const onClickProfileButton = () => {
        setOnProfileDropdown(!onProfileDropdown);
    };

    return (
        <HeaderContainer>
            <LeftHeaderContainer>
                <StyledCompanyLogo
                    companyName={Translate.t('Ui.UiCompanyName')}
                    onClickLogo={() => { return false; }}
                />

                {isAuthenticated && (
                    <>
                        <StyledTabView
                            data={tabViewData}
                            selectedTabView={selectedTabView}
                        />
                        <StyledSearchBar
                            title={Translate.t('Ui.UiSearchTitle')}
                        />
                    </>
                )}

            </LeftHeaderContainer>

            <RightHeaderContainer>
                <LanguageSwitcher
                    data={languageSwitcherData}
                    languageSelected={selectedLanguage}
                />
                <StyledProfileButton
                    title={isAuthenticated ? profileName : 'Login'}
                    icon={Icons.UserLoginIcon}
                    onClickArrow={onClickProfileButton}
                    isAuth={isAuthenticated}
                />
            </RightHeaderContainer>

            {onProfileDropdown && (
                <InputGroup data={profileDropdown} />
            )}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
`;

const LeftHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 80%;
`;

const StyledCompanyLogo = styled(CompanyLogo)`
    margin-left: 20px;
    margin-right: 20px;
`;

const StyledTabView = styled(TabView)``;

const StyledSearchBar = styled(SearchBar)`
    height: 40px; 
    margin-right: 20px;
`;

const StyledProfileButton = styled(ProfileButton)`
    margin-left: 20px;
`;

const RightHeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: 20%;
`;

const InputGroup = styled(DropdownProfile)`
    margin-top: 55px;  
    position: absolute; 
    display: flex; 
    margin-left: 90%; 
    z-index: 1;  
    background-color: white; 
`;

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: Selectors.authGetAuthToken(state),
    selectedLanguage: Selectors.getUiSelectedLanguage(state),
    selectedTabView: Selectors.getUiSelectedTabView(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setLanguage: (language: string) => dispatch(Actions.setLanguage(language)),
    setTabView: (tabView: string) => dispatch(Actions.setTabView(tabView)),
    logout: () => dispatch(Actions.authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
