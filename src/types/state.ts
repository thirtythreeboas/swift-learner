export type Translation = {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
};

export type StateTypes = {
  data: {[wordBlock: string]: Translation[]};
  chosenBlocks: string[];
  mode: boolean;
  isLoading: boolean;
};

export type TestInput = {
  target: string;
  input: string;
  answer: string[];
};

export type TestResult = {
  time: string;
  data: TestInput[];
};

export type Test = {
  results: TestResult;
  isTestStarted: boolean;
  testFormat: boolean;
  wordNumber: number;
  wordOrder: number;
  timeSpentOnTest: number;
  currentWordIndex: number;
  showResult: boolean;
};
