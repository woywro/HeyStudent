import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  StyledCourseElementList,
  StyledCourseElement,
  StyledCourseElementTitle,
} from "./style";
import { useFormik, ErrorMessage } from "formik";
import { Input } from "../../../../components/Input";
import { SubjectsAdd } from "../SubjectsAdd";
import { Button } from "../../../../components/Button";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import * as Yup from "yup";
import { Text } from "../../../../components/Text";
import { AddTags } from "../AddTags";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const Error = styled(Text)`
  color: red;
  font-size: 12px;
  padding: 5px;
`;

export const CourseView = ({ setSent }) => {
  const [newCourse, setNewCourse] = useState();
  const [newSubjects, setNewSubjects] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");
  const [tags, setTags] = useState([]);

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

  function handleSubmitAll(course) {
    const random = Math.floor(Math.random() * 100000);
    const nc = JSON.parse(JSON.stringify(course));
    nc.subjects = newSubjects;
    nc.name = nc.name.split(" ");
    nc.requiredSubjects = nc.requiredSubjects.split("/");
    nc.tags = createTags(tags, nc);
    nc.id = random.toString();
    nc.message = selectedVal;
    nc.category = [nc.category];
    nc.minPoints = { value: nc.minPoints, year: "2021/2022" };
    nc.willStudy = [];
    // console.log(nc.tags);
    setDoc(doc(db, "Courses", random.toString()), nc).then(() => {
      setSent(true);
    });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "nazwa jest za krótka!")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    university: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    departament: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    city: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    type: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    contact: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    degree: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    website: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    description: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    requiredSubjects: Yup.string()
      .min(6, "nazwa jest za krótka")
      .max(50, "nazwa jest za długa!")
      .required("pole wymagane"),
    minPoints: Yup.number()
      .positive("ilość punktów nie może być równa 0!")
      .typeError("ilość punktów nie może zawierać liter")
      .required("pole wymagane"),

    // .typeError("ilość punktów nie może zawierać liter")
    // .required("pole wymagane"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      university: "",
      departament: "",
      city: "",
      contact: "",
      type: "",
      degree: "",
      website: "",
      description: "",
      requiredSubjects: "",
      minPoints: "",
      category: "",
    },
    onSubmit: (values) => {
      setNewCourse(values);
      handleSubmitAll(values);
      // console.log(JSON.stringify(values, null, 2));
    },
    validationSchema,
  });
  return (
    <StyledCourseElementList>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            Informacje o kierunku
          </StyledCourseElementTitle>
          <InputWrapper>
            <label htmlFor="name">Nazwa kierunku</label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Error>{formik.errors.name ? formik.errors.name : null}</Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="type">Typ studiów</label>
            <Input
              id="type"
              name="type"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.type}
            />
            <Error>{formik.errors.type ? formik.errors.type : null}</Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="degree">Stopień studiów</label>
            <Input
              id="name"
              name="degree"
              type="degree"
              onChange={formik.handleChange}
              value={formik.values.degree}
            />
            <Error>{formik.errors.degree ? formik.errors.degree : null}</Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            Informacje o uczelni
          </StyledCourseElementTitle>
          <InputWrapper>
            <label htmlFor="university">Uniwersytet</label>
            <Input
              id="university"
              name="university"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.university}
            />
            <Error>
              {formik.errors.university ? formik.errors.university : null}
            </Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="city">Miasto</label>
            <Input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <Error>{formik.errors.city ? formik.errors.city : null}</Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="departament">Wydział</label>
            <Input
              id="departament"
              name="departament"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.departament}
            />
            <Error>
              {formik.errors.departament ? formik.errors.departament : null}
            </Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="contact">Kontakt</label>
            <Input
              id="contact"
              name="contact"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.contact}
            />
            <Error>
              {formik.errors.contact ? formik.errors.contact : null}
            </Error>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="website">Strona internetowa</label>
            <Input
              id="website"
              name="website"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.website}
            />
            <Error>
              {formik.errors.website ? formik.errors.website : null}
            </Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>opis kierunku</StyledCourseElementTitle>
          <InputWrapper>
            <Input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <Error>
              {formik.errors.description ? formik.errors.description : null}
            </Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            przedmioty rekrutacji
          </StyledCourseElementTitle>
          <InputWrapper>
            <Input
              id="requiredSubjects"
              name="requiredSubjects"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.requiredSubjects}
            />
            <Error>
              {formik.errors.requiredSubjects
                ? formik.errors.requiredSubjects
                : null}
            </Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>próg punktowy</StyledCourseElementTitle>
          <InputWrapper>
            <Input
              id="minPoints"
              name="minPoints"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.minPoints}
            />
            <Error>
              {formik.errors.minPoints ? formik.errors.minPoints : null}
            </Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>
            Kategoria kierunku
          </StyledCourseElementTitle>
          <InputWrapper>
            <Input
              id="category"
              name="category"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            <Error>
              {formik.errors.category ? formik.errors.category : null}
            </Error>
          </InputWrapper>
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>Tagi kierunku</StyledCourseElementTitle>
          <AddTags tags={tags} setTags={setTags} />
        </StyledCourseElement>
        <StyledCourseElement>
          <StyledCourseElementTitle>przedmioty</StyledCourseElementTitle>
          <SubjectsAdd
            newSubjects={newSubjects}
            onSubmitSubjects={onSubmitSubjects}
            setNewSubjects={setNewSubjects}
          />
        </StyledCourseElement>
        <Button type="submit">Dodaj do serwisu</Button>
      </StyledForm>
    </StyledCourseElementList>
  );
};
