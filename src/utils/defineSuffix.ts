export const defineSuffix = (parameter, value1, value2, value3) => {
  if (parameter <= 1) {
    return value1;
  } else if (parameter < 5) {
    return value2;
  } else {
    return value3;
  }
};
