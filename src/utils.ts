export const interpolate = (
  frame: number,
  inputRange: Array<number>,
  outputRange: Array<number>
) => {
  let selectedRangeIndex = 0;
  for (let i = 0; i < inputRange.length / 2; i++) {
    const [iStart, iEnd] = inputRange.slice(i * 2, i * 2 + 2);
    selectedRangeIndex = i;

    if (iStart <= frame && frame < iEnd) {
      break;
    }
  }
  const [iStart, iEnd] = inputRange.slice(
    selectedRangeIndex * 2,
    selectedRangeIndex * 2 + 2
  );
  const [oStart, oEnd] = outputRange.slice(
    selectedRangeIndex * 2,
    selectedRangeIndex * 2 + 2
  );
  if (frame < iStart) return oStart;
  if (frame >= iEnd) return oEnd;

  return oStart + ((frame - iStart) * (oEnd - oStart)) / (iEnd - iStart);
};
