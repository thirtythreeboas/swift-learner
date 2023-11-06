export type Word = {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
};

enum WordBlocks {
  APPLEJUICE = 'Apple Juice',
  REALTALK = 'Real Talk',
  WINTER = 'Winter is Coming',
  UPGRADE = 'Upgrade',
  GURU = 'Guru',
}

export type Vocabulary = {
  [WordBlocks.APPLEJUICE]: Word[];
  [WordBlocks.REALTALK]: Word[];
  [WordBlocks.WINTER]: Word[];
  [WordBlocks.UPGRADE]: Word[];
  [WordBlocks.GURU]: Word[];
};
