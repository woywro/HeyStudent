import styled from "styled-components";

export const Text = styled.p`
  font-size: ${({ size }) => handleFontSize(size)};
  font-weight: ${({ bold }) => bold && "bold"};
`;

const handleFontSize = (size) => {
  switch (size) {
    case "small":
      return "14px";
    case "big":
      return "24px";
    default:
      return "16px";
  }
};
