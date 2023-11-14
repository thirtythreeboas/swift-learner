export const hasNumericChars = (
  input: string,
  wordBlockLength: number,
): number | boolean => {
  const getOnlyDigits = input.match(/\d+/);
  if (getOnlyDigits !== null) {
    const convertedValueToNum: number = parseInt(getOnlyDigits[0], 10);
    if (!Number.isNaN(convertedValueToNum)) {
      if (convertedValueToNum > wordBlockLength) {
        const result = Math.floor(convertedValueToNum / 10);
        return result;
      }
      return convertedValueToNum;
    }
  }
  return false;
};
