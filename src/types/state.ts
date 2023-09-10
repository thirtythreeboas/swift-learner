
export type Translation = {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
}

export type StateTypes = {
  data: { [wordBlock: string]: Translation[] };
  chosenBlocks: string[];
  mode: boolean;
  isLoading: boolean;
}

export type TestInput = {
  target: string;
  input: string;
  answer: string[];
}

export type TestResult = {
  time: number;
  data: TestInput[];
}

export type Results = {
  time: number;
  data: TestInput[];
}

export type Timer = {
  showTime: boolean;
  time: number;
}

export type Test = {
  results: Results;
  startTest: boolean;
  testFormat: boolean;
  wordAmount: number;
  wordOrder: number;
  timer: Timer;
  index: number;
  closeTestWindow: boolean;
  setTimer: null;
}
