import {TestInput} from '@/types/state';

export const stopwatch = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const time = `${mins <= 9 ? `0${mins}` : mins}:${
    secs <= 9 ? `0${secs}` : secs
  }`;
  return time;
};

export const highlightAnswer = (e: TestInput) => {
  const answer = e.answer.includes(e.input);
  return {backgroundColor: answer ? '#afebaf' : '#e37474'};
};
