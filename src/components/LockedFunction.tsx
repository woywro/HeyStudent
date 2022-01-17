import styled from "styled-components";

const LockedContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 20px;
`;

export const LockedFunction = () => {
  return (
    <LockedContainer>
      <Text>dadadad</Text>
    </LockedContainer>
  );
};
