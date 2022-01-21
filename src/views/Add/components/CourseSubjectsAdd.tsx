import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import styled from "styled-components";
import { shadow } from "../../../mixnins/shadow";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
  border-radius: 10px;
  ${shadow}
`;

const SubjectContainer = styled.div`
  width: 100%;
  padding: 10px;
  ${shadow}
  border-radius: 10px;
`;

const SubjectList = styled.ul`
  list-style: none;
  display: grid;
  justify-items: center;
  align-items: center;
  flex-flow: column;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column;
  margin: 5px;
`;

const Subject = styled.li`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 20px;
  ${shadow}
`;

const StyledForm = styled.form`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const CourseSubjectsAdd = ({
  registerSubjects,
  newSubjects,
  setNewSubjects,
  handleSubmitSubjects,
  onSubmitSubjects,
}) => {
  const inputs = ["name", "hours", "ects", "semester", "description"];
  const formik = useFormik({
    initialValues: {
      name: "",
      hours: "",
      ects: "",
      semester: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      onSubmitSubjects(values);
    },
  });
  return (
    <Container>
      <Typography variant="h6">Dodaj przedmioty</Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        {inputs.map((e) => {
          return (
            <Column>
              <label htmlFor={e}>{e}</label>
              <Input
                id={e}
                name={e}
                type={e}
                onChange={formik.handleChange}
                value={formik.values.e}
              />
            </Column>
          );
        })}

        <Button
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          type="submit"
        >
          Dodaj przedmiot
        </Button>
      </StyledForm>
      <SubjectContainer>
        <Text>dodane przedmioty</Text>
        <SubjectList>
          {newSubjects.map((e) => {
            return (
              <Subject>
                <Text bold>{e.name}</Text>
                <Text>Godziny: {e.hours}</Text>
                <Text>ECTS: {e.ects}</Text>
                <Text>opis: {e.description}</Text>
                <Button
                  onClick={() => {
                    setNewSubjects(
                      newSubjects.filter((x) => x.name !== e.name)
                    );
                  }}
                >
                  x
                </Button>
              </Subject>
            );
          })}
        </SubjectList>
      </SubjectContainer>
    </Container>
  );
};
