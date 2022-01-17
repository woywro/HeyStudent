import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  background: #e2e7f3;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  width: 100%;
  &:focus {
    transform: scale(1.02);
    outline: none;
  }
`;

export const Input = ({ value, onChange, placeholder }) => {
  return (
    <StyledInput value={value} onChange={onChange} placeholder={placeholder} />
  );
};
