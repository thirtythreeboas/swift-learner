import {css} from '@emotion/react';
import {mq} from '@/utils/mediaQueries';

export const controllerBtnStyles = {
  container: css`
    ${mq.small} {
      flex-direction: row;
      justify-content: space-between;
    }
    display: flex;
    flex-direction: column;
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
