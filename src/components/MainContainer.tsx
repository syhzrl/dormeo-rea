import React from 'react';
import styled from 'styled-components';

interface MainContainerProps {
    children: JSX.Element | JSX.Element[];
}

const MainContainer = ({ children }: MainContainerProps): JSX.Element => {
    return (
        <BoxContainer>
            <BoxContent>
                {children}
            </BoxContent>
        </BoxContainer>
    );
};

const BoxContainer = styled.div`
    padding: 0 12%;
    background: #E5E5E5;
`;

const BoxContent = styled.div`
    position: relative;
    min-height: 710px;
    background: #fff;
    padding-top: 0.1px; //need to give padding
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05), 4px 0px 4px rgba(0, 0, 0, 0.05);
`;

export default MainContainer;
