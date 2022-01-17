import styled from "styled-components";

const StyledText = styled.p`
  font-size: ${(props) => props.size};
`;

export const Text = ({ children, size }) => {
  return <StyledText size={size}>{children}</StyledText>;
};
