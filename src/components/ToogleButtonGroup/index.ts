import styled from "styled-components";
import { Button } from "../Button";

export const ToggleButtonGroup = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const ToggleButton = styled(Button)<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ checked }) => (checked ? "#039be5" : "#e2e7f3")};
  padding: 5px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 5px;
  box-shadow: none;
  font-size: 12px;
`;
