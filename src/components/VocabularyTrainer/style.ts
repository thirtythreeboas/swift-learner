import {css} from '@emotion/react';

export const vocabStyles = {
  container: css`
    display: flex;
    gap: 10px;
  `,
  inputBlock: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  textfield: css`
    cursor: auto;
    pointer-events: none;
    & label {
      background-color: #fff;
      padding-right: 6px;
    }
  `,
  badge: css`
    position: absolute;
    top: 0;
    right: 0;
  `,
};
