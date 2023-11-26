import {css} from '@emotion/react';

export const dictionaryStyles = {
  paper: css`
    width: 600px;
  `,
  header: css`
    margin: 0 auto;
    font-family: 'Roboto Mono', monospace;
    margin-bottom: 20px;
  `,
  contentWrapper: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 35px 0;
    width: 100%;
  `,
  tableCell: css`
    width: 300px;
    text-align: left;
  `,
  cardMedia: css`
    height: 140px;
  `,
};
