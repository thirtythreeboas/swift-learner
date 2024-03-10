import {css} from '@emotion/react';
import {mq} from '@/utils/mediaQueries';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Scada, sans-serif;
  }
`;

export const appStyles = {
  appContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    ${mq.small}, ${mq.big}, ${mq.large} {
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
