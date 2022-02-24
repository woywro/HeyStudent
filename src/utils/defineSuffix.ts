export const defineSuffix = (parameter:number, value1:string, value2:string, value3:string) => {
  if (parameter <= 1) {
    return value1;
  } else if (parameter < 5) {
    return value2;
  } else {
    return value3;
  }
};
