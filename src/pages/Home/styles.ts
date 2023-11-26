import {css} from '@emotion/react';

export const homeStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    padding: 10px;
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
  card: css`
    max-width: 345px;
  `,
  cardMedia: css`
    height: 140px;
  `,
  link: css`
    text-decoration: none;
    color: #1976d2;
    font-weight: 500;
  `,
};
