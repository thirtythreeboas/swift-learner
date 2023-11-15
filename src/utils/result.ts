import {TestInput} from '@/types/state';

export const highlightAnswer = (e: TestInput) => {
  const answer = e.correctAnswer.includes(e.userAnswer);
  return {backgroundColor: answer ? '#afebaf' : '#e37474'};
};
