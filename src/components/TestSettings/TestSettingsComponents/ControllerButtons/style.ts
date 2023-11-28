import {css} from '@emotion/react';

export const controllerBtnStyles = {
  container: css`
    display: flex;
    justify-content: space-between;
  `,
  btn: css`
    background-color: #1976d2;
    border: 2px solid #1976d2;
    margin: 10px 0;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #000;
      border: 2px solid #1976d2;
    }
    &:disabled {
      background-color: #00000042;
      border-color: #00000042;
    }
  `,
};
