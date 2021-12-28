import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { ElementCard } from "../../../components/ElementCard";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { ShowSimilar } from "./ShowSimilar";
import { Chat } from "./Chat";
import { ReportError } from "./ReportError";
import { Box } from "@mui/system";
import { ItemType } from "../../../types";
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
  const courseSubjectsFiltered = element.subjects
    .filter((e) => e.year == year)
    .sort((a, b) => b.hours - a.hours);
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      spacing={2}
      sx={{
        padding: 1,
        width: 1,
      }}
    >
      <Grid item xs={12} sm={12} md={4}>
        <ElementCard
          title="Informacje o uczelni"
          content={
            <Box>
              <Typography variant="h5">{element.university}</Typography>
              <Typography variant="subtitle1">{element.departament}</Typography>
              <Typography variant="subtitle1">{element.contact}</Typography>
              <Button
                color="secondary"
                size="small"
                variant="outlined"
                onClick={() => openWebsite(element.website)}
              >
                odwiedź stronę
              </Button>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <ElementCard
          title="Opis kierunku"
          content={[
            <Typography variant="body1" sx={{ padding: 1 }}>
              {element.description}
            </Typography>,
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <ElementCard
          title="Przedmioty rekrutacji"
          content={
            <Grid
              container
              spacing={1}
              sx={{
                overflowY: "scroll",
                height: "150px",
              }}
            >
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
            </Grid>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ElementCard
          title="Próg punktowy"
          content={[
            <Grid item xs={12} sx={{ padding: 1 }}>
              <Typography variant="h5">{element.minPoints.year}</Typography>
              <Typography variant="subtitle1">
                {element.minPoints.value}pkt
              </Typography>
            </Grid>,
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ElementCard
          title="Społeczność"
          content={[<Chat element={element} />]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ElementCard
          title="Zgłoś błąd"
          content={[<ReportError choosen={element} />]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ElementCard
          title="Przedmioty"
          content={
            <>
              <Select
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
              </Select>
              {courseSubjectsFiltered.map((e) => {
                return (
                  <div>
                    <Accordion sx={{ width: 1 }}>
                      <AccordionSummary>
                        <Typography sx={{ width: 1 }}>
                          {e.name} ({e.hours}h)
                        </Typography>
                      </AccordionSummary>
                      <Divider orientation="horizontal" flexItem />
                      <AccordionDetails>
                        <Typography variant="body1">{e.ects} ects</Typography>
                        <Typography variant="body2">{e.description}</Typography>
                      </AccordionDetails>
                      <Divider orientation="horizontal" flexItem />
                    </Accordion>
                  </div>
                );
              })}
            </>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ShowSimilar element={element} />
      </Grid>
    </Grid>
  );
};
