import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MobileStepper } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import { CourseInfoAdd } from "./components/CourseInfoAdd";
import { CourseSubjectsAdd } from "./components/CourseSubjectsAdd";
import { CourseSubmit } from "./components/CourseSubmit";
import { Typography } from "@mui/material";
import { CourseView } from "./components/CourseView/index";

export const Add = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
        width: "100vw",
        height: "100%",
      }}
    >
      <PageTopBar title="Dodaj kierunek" />
      <CourseView />
    </Container>
  );
};
