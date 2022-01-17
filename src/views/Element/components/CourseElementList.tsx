import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { ShowSimilar } from "./ShowSimilar";
import { Chat } from "./Chat";
import { ReportError } from "./ReportError";
import { Box } from "@mui/system";
import { ItemType } from "../../../types";
import styled from "styled-components";
import { IsInterested } from "./IsInterested";
import Accordion from "../../../components/Accordion";

const StyledCourseElementList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 80%;
`;

const StyledCourseElement = styled.li`
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  margin: 10px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const StyledCourseElementTitle = styled.h1`
  padding: 10px;
  font-weight: normal;
`;

interface Props {
  element: ItemType;
}
export const CourseElementList = ({ element }: Props) => {
  const [year, setYear] = useState(1);
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  function openWebsite(url) {
    window.open(url, "_blank");
  }

  const [tags, setTags] = useState([]);
  console.log(tags);

  // useEffect(() => {
  //   const allTags = () => {
  //     const t = [];
  //     element.subjects.map((e) => {
  //       e.tags.map((i) => t.push(i));
  //     });
  //     setTags(t);
  //   };
  //   allTags();
  // }, []);

  const courseSubjectsFiltered = element.subjects
    .filter((e) => e.year == year)
    .sort((a, b) => b.hours - a.hours);
  return (
    <StyledCourseElementList>
      <StyledCourseElement>
        <StyledCourseElementTitle>Zainteresowanie</StyledCourseElementTitle>
        <IsInterested data={element} />
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>opis kierunku</StyledCourseElementTitle>
        <Typography variant="body1" sx={{ padding: 1 }}>
          {element.description}
        </Typography>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>
          przedmioty rekrutacji
        </StyledCourseElementTitle>
        {element.requiredSubjects.map((e) => {
          return (
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: 0.5,
                  marginTop: 0.5,
                }}
              >
                <Typography variant="subtitle2">{e.name}</Typography>
                <Typography variant="subtitle1">{e.level}</Typography>
              </Box>
            </Grid>
          );
        })}
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>przedmioty</StyledCourseElementTitle>
        <>
          {/* <Select
            value={year}
            defaultValue={1}
            size="small"
            sx={{
              border: 1,
              marginBottom: 1,
            }}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value={1}>pierwszy semsestr</MenuItem>
            <MenuItem value={2}>drugi semestr</MenuItem>
            <MenuItem value={3}>trzeci semestr</MenuItem>
            <MenuItem value={4}>czwarty semestr</MenuItem>
            <MenuItem value={5}>piąty semestr</MenuItem>
            <MenuItem value={5}>szósty semestr</MenuItem>
          </Select> */}
          {courseSubjectsFiltered.map((e) => {
            // return (
            //   <div>
            //     <Accordion sx={{ width: 1 }}>
            //       <AccordionSummary>
            //         <Typography sx={{ width: 1 }}>
            //           {e.name} ({e.hours}h)
            //         </Typography>
            //       </AccordionSummary>
            //       <Divider orientation="horizontal" flexItem />
            //       <AccordionDetails>
            //         <Typography variant="body1">{e.ects} ects</Typography>
            //         <Typography variant="body2">{e.description}</Typography>
            //       </AccordionDetails>
            //       <Divider orientation="horizontal" flexItem />
            //     </Accordion>
            //   </div>
            // );
            return <Accordion title={`${e.name} ${e.hours}h`} content={e} />;
          })}
        </>
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>podobne kierunki</StyledCourseElementTitle>
        <ShowSimilar element={element} />
      </StyledCourseElement>
      <StyledCourseElement>
        <StyledCourseElementTitle>zgłoś błąd</StyledCourseElementTitle>
        <ReportError choosen={element} />
      </StyledCourseElement>
      {/* <StyledCourseElement>
        <StyledCourseElementTitle>tagi</StyledCourseElementTitle>
        {tags.map((e) => {
          return <p>{e}</p>;
        })}
      </StyledCourseElement> */}
    </StyledCourseElementList>

    // {/* <ElementCard
    //     title="Informacje o uczelni"
    //     content={
    //       <Box>
    //         <Typography variant="h5">{element.university}</Typography>
    //         <Typography variant="subtitle1">{element.departament}</Typography>
    //         <Typography variant="subtitle1">{element.contact}</Typography>
    //         <Button
    //           color="secondary"
    //           size="small"
    //           variant="outlined"
    //           onClick={() => openWebsite(element.website)}
    //         >
    //           odwiedź stronę
    //         </Button>
    //       </Box>
    //     }
    //   /> */}
    //   <ElementCard
    //     title="Opis kierunku"
    //     content={[
    //       <Typography variant="body1" sx={{ padding: 1 }}>
    //         {element.description}
    //       </Typography>,
    //     ]}
    //   />
    //   {/* <ElementCard
    //     title="Przedmioty rekrutacji"
    //     content={

    //         {element.requiredSubjects.map((e) => {
    //           return (
    //             <Grid item xs={4}>
    //               <Box
    //                 sx={{
    //                   padding: 0.5,
    //                   marginTop: 0.5,
    //                 }}
    //               >
    //                 <Typography variant="subtitle2">{e.name}</Typography>
    //                 <Typography variant="subtitle1">{e.level}</Typography>
    //               </Box>
    //             </Grid>
    //           );
    //         })}
    //     /> */}

    //   <ElementCard
    //     title="Próg punktowy"
    //     content={[
    //       <Grid item xs={12} sx={{ padding: 1 }}>
    //         <Typography variant="h5">{element.minPoints.year}</Typography>
    //         <Typography variant="subtitle1">
    //           {element.minPoints.value}pkt
    //         </Typography>
    //       </Grid>,
    //     ]}
    //   />
    //   <ElementCard
    //     title="Społeczność"
    //     content={[<Chat element={element} />]}
    //   />
    //   <ElementCard
    //     title="Zgłoś błąd"
    //     content={[<ReportError choosen={element} />]}
    //   />
    //   <ElementCard
    //     title="Przedmioty"
    //     content={
    //       <>
    //         <Select
    //           value={year}
    //           defaultValue={1}
    //           size="small"
    //           sx={{
    //             border: 1,
    //             marginBottom: 1,
    //           }}
    //           fullWidth
    //           onChange={handleChange}
    //         >
    //           <MenuItem value={1}>pierwszy semsestr</MenuItem>
    //           <MenuItem value={2}>drugi semestr</MenuItem>
    //           <MenuItem value={3}>trzeci semestr</MenuItem>
    //           <MenuItem value={4}>czwarty semestr</MenuItem>
    //           <MenuItem value={5}>piąty semestr</MenuItem>
    //           <MenuItem value={5}>szósty semestr</MenuItem>
    //         </Select>
    //         {courseSubjectsFiltered.map((e) => {
    //           return (
    //             <div>
    //               <Accordion sx={{ width: 1 }}>
    //                 <AccordionSummary>
    //                   <Typography sx={{ width: 1 }}>
    //                     {e.name} ({e.hours}h)
    //                   </Typography>
    //                 </AccordionSummary>
    //                 <Divider orientation="horizontal" flexItem />
    //                 <AccordionDetails>
    //                   <Typography variant="body1">{e.ects} ects</Typography>
    //                   <Typography variant="body2">{e.description}</Typography>
    //                 </AccordionDetails>
    //                 <Divider orientation="horizontal" flexItem />
    //               </Accordion>
    //             </div>
    //           );
    //         })}
    //       </>
    //     }
    //   />
  );
};
