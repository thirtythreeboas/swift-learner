import {UserAnswersList} from '@/types/state';

export const highlightAnswer = (e: UserAnswersList) => {
  const answer = e.correctAnswer.includes(e.userAnswer);
  return {backgroundColor: answer ? '#afebaf' : '#e37474'};
};
