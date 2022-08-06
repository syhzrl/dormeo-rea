import React, { FC } from 'react';
import styled from 'styled-components';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

const StyledToast = styled(ToastContainer).attrs({
    className: 'toast-container',
    toastClassName: 'toast',
    bodyClassName: 'body',
    progressClassName: 'progress',
})`
  /* .toast-container */
  /* width: 100%; */

  /* .toast is passed to toastClassName */
  .toast {
    background-color: #FFF2E7;
    border-radius: 12px;
    
    padding: 12px;

    min-height: 40px;
  }

  button[aria-label="close"] {
    display: none;
  }

  /* .body is passed to bodyClassName */
  .body {
    padding: 0 10px;
    margin: 0;

    font-size: 14px;
    line-height: 16px;
    font-weight: 400;

    color: #000000;
  }

  /* .progress is passed to progressClassName */
  .progress {}
`;

const CustomToastContainer: FC<ToastContainerProps> = () => {
    return (
        <StyledToast hideProgressBar />
    );
};

export default CustomToastContainer;
