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

enum WordBlocks {
  APPLEJUICE = 'AppleJuice',
  REALTALK = 'RealTalk',
  BETTER = 'Better than Others',
  WINTER = 'WinterIsComing',
  UPGRADE = 'Upgrade',
  GURU = 'Guru',
}

export type Vocabulary = {
  [WordBlocks.APPLEJUICE]: WordBlock[];
  [WordBlocks.REALTALK]: WordBlock[];
  [WordBlocks.BETTER]: WordBlock[];
  [WordBlocks.WINTER]: WordBlock[];
  [WordBlocks.UPGRADE]: WordBlock[];
  [WordBlocks.GURU]: WordBlock[];
};

export type BlockListElement = {
  name: string;
  path: string;
  id: number;
};

export type StateTypes = {
  blockList: BlockListElement[];
  wordBlock: Word[];
  chosenBlocks: BlockListElement | null;
  mode: boolean;
  isLoading: boolean;
};

export type TestInput = {
  word: string;
  userAnswer: string;
  correctAnswer: string[];
};

export type TestResult = {
  time: string;
  data: TestInput[];
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
