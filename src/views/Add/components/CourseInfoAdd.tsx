import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { ErrorMessage } from "@hookform/error-message";
import { generalInfoInputs } from "../../../utils/inputsData";
import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import styled from "styled-components";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { shadow } from "../../../mixnins/shadow";
import { Text } from "../../../components/Text";

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

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

export const CourseInfoAdd = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  setActiveStep,
  activeStep,
}) => {
  const inputs = [
    "name",
    "university",
    "departament",
    "city",
    "type",
    "degree",
    "website",
    "description",
    "requiredSubjects",
    "tags",
    "category",
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      university: "",
      departament: "",
      city: "",
      type: "",
      degree: "",
      website: "",
      description: "",
      requiredSubjects: "",
      tags: "",
      category: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setActiveStep(activeStep + 1);
    },
  });
  return (
    <Container>
      <Text bold size="big">
        Ogólne informacje
      </Text>
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
        <Button type="submit">Submit</Button>
      </StyledForm>
    </Container>
  );
};
