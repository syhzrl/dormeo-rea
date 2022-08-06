import React from 'react';
import styled, { css } from 'styled-components';

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
  width?: string;
  closeCursor?: boolean;
  onClickClose?: () => void;
}

const Modal = ({ show = false, children, width, closeCursor, onClickClose, ...otherProps }: ModalProps):JSX.Element => {
    return (
        <ModalContainer show={show} {...otherProps}>
            <ModalContent width={width}>
                {closeCursor && <CloseButton onClick={onClickClose}>&times;</CloseButton> }
                {children}
            </ModalContent>
        </ModalContainer>
    );
};

Modal.defaultProps = {
    width: '80%',
    closeCursor: false,
    onClickClose: undefined,
};

const ModalContainer = styled.div<{show: boolean}>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;

    ${(props) => props.show && css`
        display: block;
    `}
`;

const ModalContent = styled.div<{width?: string}>`
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    
    width: ${({ width }) => (!width ? '80%' : width)};
    height: auto;

    padding: 20px;

    background: white;

    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05), 4px 0px 4px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05), 0px -4px 4px rgba(0, 0, 0, 0.05);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 14px;

    font-size: 28px;

    color: #000;
    background: transparent;

    cursor: pointer;

    border: none;
`;

export default Modal;
