export type Word = {
  rus: string[];
  eng: string[];
  id: number;
};

export type WordBlock = {
  name: string;
  id: number;
  words: Word[];
};

export type BlockListElement = {
  name: string;
  path: string;
  id: number;
  img: string;
  description: string;
};

export type StateTypes = {
  blockList: BlockListElement[];
  wordBlock: Word[];
  chosenBlocks: BlockListElement | null;
  mode: boolean;
  isLoading: boolean;
};

export type UserAnswersList = {
  word: string;
  userAnswer: string;
  correctAnswer: string[];
  id?: number;
};

export type TestResult = {
  time: string;
  answers: UserAnswersList[];
};

export type Test = {
  results: TestResult;
  sourceLangCode: string;
  targetLangCode: string;
  isTestStarted: boolean;
  testFormat: boolean;
  wordNumber: number;
  wordOrder: number;
  timeSpentOnTest: number;
  currentWordIndex: number;
  showResult: boolean;
};
