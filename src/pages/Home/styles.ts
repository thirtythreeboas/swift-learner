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
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
  `,
  card: css`
    max-width: 345px;
  `,
  cardMedia: css`
    height: 140px;
  `,
  button: css`
    padding: 0;
  `,
  link: css`
    text-decoration: none;
    color: #1976d2;
    font-weight: 500;
    padding: 8px;
  `,
};
