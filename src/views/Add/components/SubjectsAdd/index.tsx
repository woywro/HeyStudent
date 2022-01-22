import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import styled from "styled-components";
import { shadow } from "../../../../mixnins/shadow";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { Text } from "../../../../components/Text";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
  border-radius: 10px;
`;

const SubjectList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 10px;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column;
  margin: 5px;
`;

const Subject = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  flex-flow: column;
  ${shadow};
`;
const Grid = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
`;

const StyledForm = styled.form`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const SubjectsAdd = ({
  newSubjects,
  setNewSubjects,
  onSubmitSubjects,
}) => {
  const inputs = ["name", "hours", "ects", "year", "description"];
  const formik = useFormik({
    initialValues: {
      name: "",
      hours: "",
      ects: "",
      year: "",
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
      <Text>dodane przedmioty</Text>
      <SubjectList>
        {newSubjects.map((e) => {
          return (
            <Subject>
              <Grid>
                <Text bold>{e.name}</Text>
                <Text>Godziny: {e.hours}</Text>
                <Text>ECTS: {e.ects}</Text>
                <Text>Semestr: {e.year}</Text>
                <Button
                  onClick={() => {
                    setNewSubjects(
                      newSubjects.filter((x) => x.name !== e.name)
                    );
                  }}
                >
                  x
                </Button>
              </Grid>
              <Text>Opis: {e.description}</Text>
            </Subject>
          );
        })}
      </SubjectList>
    </Container>
  );
};
