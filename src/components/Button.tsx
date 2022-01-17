import styled from "styled-components";
export const StyledButton = styled.button`
  background: #039be5;
  border-radius: 999px;
  box-shadow: #039be5 0 10px 20px -10px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border: 0;
  margin: 10px;
`;

export const Button = ({ onClick, text }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
