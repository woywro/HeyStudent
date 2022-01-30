const size = {
  xs: "0px",
  sm: "600px",
  lg: "1000px",
  xl: "1280px",
};
const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};
export default { size, device };
