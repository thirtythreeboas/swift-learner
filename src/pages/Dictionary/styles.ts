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
  hideWordsBtn: css`
    margin-left: 10px;
  `,
  tableHeadCell: css`
    font-size: large;
    font-weight: 600;
    width: 300px;
    text-align: left;
  `,
  tableCell: css`
    width: 300px;
    text-align: left;
    & span {
      font-size: 1.2rem;
    }
  `,
  cardMedia: css`
    height: 140px;
  `,
  hideWordLine: css`
    & span {
      padding: 5px;
      background: #1976d2;
      border-radius: 5px;
      color: transparent;
      &:hover {
        color: #fff;
      }
    }
  `,
};
