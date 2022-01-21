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
  const [activeStep, setActiveStep] = useState(0);
  const [newCourse, setNewCourse] = useState();
  const [newSubjects, setNewSubjects] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerSubjects,
    handleSubmit: handleSubmitSubjects,
    formState: { errors: errorsSubjects },
  } = useForm();
  const onSubmit = (data) => {
    setNewCourse(data);
    console.log(newCourse);
    handleNext();
  };

  const onSubmitSubjects = (data) => {
    setNewSubjects([...newSubjects, data]);
    console.log(newSubjects);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // function createTags(tags, nc) {
  //   let tagsCopy = JSON.parse(JSON.stringify(tags));
  //   tags.push(nc.city);
  //   const toDelete = ["i", "w"];
  //   tags.push(...nc.name.filter((e) => !toDelete.includes(e)));
  //   var result1 = tags.flatMap((v, i) =>
  //     tags.slice(i + 1).map((w) => v + " " + w)
  //   );
  //   var result2 = tags.flatMap((v, i) =>
  //     tags.slice(i + 1).map((w) => w + " " + v)
  //   );
  //   tags.push(nc.name.join(" "));
  //   let result = result1.concat(result2);
  //   result.push(...tagsCopy);
  //   result.push(nc.city);
  //   result.push(nc.name.join(" "));
  //   result.push(nc.university);
  //   result.push(nc.category);
  //   result.push(`${nc.category} ${nc.city}`);
  //   result.push(`${nc.city} ${nc.category}`);
  //   result.push(`${nc.city} ${nc.name.join(" ")}`);
  //   result.push(`${nc.name.join(" ")} ${nc.city}`);
  //   result = result.map((e) => e.toLowerCase());
  //   return result;
  // }

  // function handleSubmitAll() {
  //   const random = Math.floor(Math.random() * 100000);
  //   const nc = newCourse;
  //   nc.subjects = newSubjects;
  //   nc.name = nc.name.split(" ");
  //   let requiredArray = nc.requiredSubjects.split("/");
  //   let requiredSubject = {};
  //   nc.requiredSubjects = requiredArray.map((e) => {
  //     return {
  //       name: e.split(" ")[0],
  //       level: e.split(" ")[1],
  //     };
  //   });
  //   nc.tags = createTags(nc.tags.split("/"), nc);
  //   nc.id = random.toString();
  //   nc.message = selectedVal;
  //   nc.category = [nc.category];
  //   nc.minPoints = { value: nc.minPoints, year: "2021/2022" };
  //   nc.willStudy = [];
  //   nc.willStudyCount = 0;
  //   console.log(newCourse.tags);
  //   setDoc(doc(db, "Courses", random.toString()), newCourse);
  // }

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
