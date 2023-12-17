import {css} from '@emotion/react';

export const dictionaryStyles = {
  paper: css`
    width: 600px;
  `,
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  nameCell: css`
    font-size: large;
    font-weight: 400;
    width: 300px;
    text-align: left;
    & a {
      text-decoration: none;
      color: #fff;
      background-color: #1976d2;
      padding: 8px;
      border-radius: 3px;
      border: 2px solid #1976d2;
      transition:
        background-color 250ms,
        border-color 250ms,
        color 250ms;
      &:hover {
        background-color: #fff;
        color: #000;
        border: 2px solid #1976d2;
      }
    }
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
