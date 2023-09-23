export const formatNumberToThousands = (value: number) => {
  return value >= 10000 ? (value / 1000).toFixed(1) + "K" : value.toString();
};
