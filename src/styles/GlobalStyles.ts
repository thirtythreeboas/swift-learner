import {css} from '@emotion/react';

const breakpoints = [576, 768, 992, 1200];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const appStyles = {
  appContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    ${mq[0]}, ${mq[1]}, ${mq[2]}, ${mq[3]} {
      max-width: 100%;
      padding: 0;
      margin: 0;
    }
  `,
  contentSection: css`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,
};
