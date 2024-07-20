import {css} from '@emotion/react';
import {mq} from '@/utils/mediaQueries';

export const testSettingsStyles = {
  container: css`
    ${mq.small} {
      width: 600px;
      margin: 0;
    }
    width: auto;
  `,
  contentWrapper: css`
    max-width: 400px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px 0;
  `,
};
