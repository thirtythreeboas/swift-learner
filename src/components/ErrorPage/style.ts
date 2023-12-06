import {css} from '@emotion/react';

export const errorPageStyle = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    & > * {
      font-family: Scada, sans-serif;
    }
  `,
  redirect: css`
    background-color: #1976d2;
    margin-top: 15px;
    &:hover {
      background-color: #1565c0;
    }
  `,
  link: css`
    text-decoration: none;
    color: #fff;
  `,
};
