export type TestInput = {
  target: string,
  input: string,
  answer: string[],
};

export type TestResult = {
  time: number,
  data: TestInput[],
};
