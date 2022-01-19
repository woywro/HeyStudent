import styled from "styled-components";

export const Text = styled.p`
  font-size: ${({ size }) => handleFontSize(size)};
`;

const handleFontSize = (size) => {
  switch (size) {
    case "small":
      return "12px";
    case "big":
      return "24px";
    default:
      return "16px";
  }
};
