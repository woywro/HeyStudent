import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Text } from "../../../../components/Text";
import { shadow } from "../../../../mixnins/shadow";
const Row = styled.div`
  display: flex;
  flex-flow: row;
`;

const TagList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 50px;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  ${shadow};
`;

const Tag = styled.li`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  ${shadow}
`;

const Container = styled.div`
  padding: 10px;
`;

export const AddTags = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = useCallback(
    (e) => {
      e.preventDefault();
      setTags([...tags, inputValue]);
    },
    [inputValue]
  );

  const handleDeleteTag = (e) => {
    const filtered = tags.filter((x: string) => x !== e.target.textContent);
    setTags(filtered);
  };

  return (
    <Container>
      <Row>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {tags.length <= 4 ? <Button onClick={handleAddTag}>+</Button> : ""}
      </Row>
      {tags.length > 4 && <Text>Możesz dodać maksymalnie 5 tagów</Text>}
      <TagList>
        {tags.map((e) => {
          return <Tag onClick={handleDeleteTag}>{e}</Tag>;
        })}
      </TagList>
    </Container>
  );
};
