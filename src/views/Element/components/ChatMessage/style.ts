import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  flex-flow: reverse-column;
  align-items: center;
  justify-content: ${(props) => props.messageJustify};
  width: 100%;
`;

export const Message = styled.div`
  padding: 5px;
  border-radius: 10px;
  margin: 5px;
  background: ${(props) => props.messageColor};
`;
