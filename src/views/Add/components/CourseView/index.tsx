import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  StyledCourseElementList,
  StyledCourseElement,
  StyledCourseElementTitle,
} from "./style";
import { useFormik } from "formik";
import { Input } from "../../../../components/Input";
import { CourseSubjectsAdd } from "../CourseSubjectsAdd";
import { Button } from "../../../../components/Button";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const CourseView = () => {
  const [newCourse, setNewCourse] = useState();
  const [newSubjects, setNewSubjects] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");

  const onSubmitSubjects = (data) => {
    setNewSubjects([...newSubjects, data]);
  };

  function createTags(tags, nc) {
    let tagsCopy = JSON.parse(JSON.stringify(tags));
    tags.push(nc.city);
    const toDelete = ["i", "w"];
    tags.push(...nc.name.filter((e) => !toDelete.includes(e)));
    var result1 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => v + " " + w)
    );
    var result2 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => w + " " + v)
    );
    tags.push(nc.name.join(" "));
    let result = result1.concat(result2);
    result.push(...tagsCopy);
    result.push(nc.city);
    result.push(nc.name.join(" "));
    result.push(nc.university);
    result.push(nc.category);
    result.push(`${nc.category} ${nc.city}`);
    result.push(`${nc.city} ${nc.category}`);
    result.push(`${nc.city} ${nc.name.join(" ")}`);
    result.push(`${nc.name.join(" ")} ${nc.city}`);
    result = result.map((e) => e.toLowerCase());
    return result;
  }

  function handleSubmitAll() {
    const random = Math.floor(Math.random() * 100000);
    const nc = newCourse;
    nc.subjects = newSubjects;
    nc.name = nc.name.split(" ");
    let requiredArray = nc.requiredSubjects.split("/");
    let requiredSubject = {};
    nc.requiredSubjects = requiredArray.map((e) => {
      return {
        name: e.split(" ")[0],
        level: e.split(" ")[1],
      };
    });
    nc.tags = createTags(nc.tags.split("/"), nc);
    nc.id = random.toString();
    nc.message = selectedVal;
    nc.category = [nc.category];
    nc.minPoints = { value: nc.minPoints, year: "2021/2022" };
    nc.willStudy = [];
    nc.willStudyCount = 0;
    console.log(newCourse.tags);
    setDoc(doc(db, "Courses", random.toString()), newCourse);
  }

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
    },
  });
  return (
    <StyledCourseElementList>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledCourseElement>
          <StyledCourseElementTitle>Nazwa kierunku</StyledCourseElementTitle>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            Informacje o uczelni
          </StyledCourseElementTitle>
          <label htmlFor="university">Uniwersytet</label>
          <Input
            id="university"
            name="university"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.university}
          />
          <label htmlFor="departament">Wydział</label>
          <Input
            id="departament"
            name="departament"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.departament}
          />
          <label htmlFor="contact">Kontakt</label>
          <Input
            id="contact"
            name="contact"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.contact}
          />
          <label htmlFor="website">Strona internetowa</label>
          <Input
            id="website"
            name="website"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>opis kierunku</StyledCourseElementTitle>
          <Input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            przedmioty rekrutacji
          </StyledCourseElementTitle>
          <Input
            id="requiredSubjects"
            name="requiredSubjects"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.requiredSubjects}
          />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>próg punktowy</StyledCourseElementTitle>
          <Input
            id="minPoints"
            name="minPoints"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.minPoints}
          />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>przedmioty</StyledCourseElementTitle>
          <CourseSubjectsAdd
            newSubjects={newSubjects}
            onSubmitSubjects={onSubmitSubjects}
          />
        </StyledCourseElement>
        <Button type="submit">Zapisz</Button>
      </StyledForm>
    </StyledCourseElementList>
  );
};
