import {TestInput} from '@/types/state';

export const highlightAnswer = (e: TestInput) => {
  const answer = e.answer.includes(e.input);
  return {backgroundColor: answer ? '#afebaf' : '#e37474'};
};
