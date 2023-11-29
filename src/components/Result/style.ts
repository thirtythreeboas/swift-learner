import {css} from '@emotion/react';
import {UserAnswersList} from '@/types/state';

export const highlightAnswer = (e: UserAnswersList) => {
  const answer = e.correctAnswer.includes(e.userAnswer);
  return css`
    background-color: ${answer ? '#afebaf' : '#e37474'};
  `;
};

export const resultStyle = {
  container: css`
    overflow-x: initial;
    margin-top: 50px;
    min-width: 600px;
  `,
  headTableCell: css`
    border-bottom: none;
    text-alight: left;
  `,
  leftBadge: css`
    & .MuiBadge-badge {
      top: -50px;
      right: -10px;
      font-size: 20px;
      height: 30px;
      width: 140px;
    }
  `,
  rightBadge: css`
    & .MuiBadge-badge {
      top: -50px;
      right: -40px;
      font-size: 20px;
      height: 30px;
    }
  `,
  bodyTableCell: css`
    width: 200px;
    text-alight: left;
    border: 2px solid #fff;
    background-color: #eaffd5;
  `,
};
