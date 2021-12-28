import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { subjectInputs } from "../../../utils/inputsData";

export const CourseSubjectsAdd = ({
  registerSubjects,
  newSubjects,
  setNewSubjects,
  handleSubmitSubjects,
  onSubmitSubjects,
}) => {
  return (
    <Box
      sx={{
        padding: 1,
        margin: 1,
        width: 1,
      }}
    >
      <Typography variant="h6">Dodaj przedmioty</Typography>
      <form onSubmit={handleSubmitSubjects(onSubmitSubjects)}>
        {subjectInputs.map((e) => {
          return (
            <TextField
              sx={{ margin: 1 }}
              label={e.label}
              {...registerSubjects(e.element, { required: false })}
            />
          );
        })}
        <Button
          type="submit"
          variant="contained"
          sx={{ margin: 1, backgroundColor: "secondary.main" }}
        >
          Dodaj przedmiot
        </Button>
      </form>
      <Box
        sx={{
          backgroundColor: "primary.main",
          position: "absolute",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          padding: 2,
          left: 0,
          width: "100vw",
          marginTop: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: "white", marginBottom: 1 }}>
          dodane przedmioty
        </Typography>
        <Box sx={{ overflowY: "scroll", height: "35vh" }}>
          {newSubjects.map((e) => {
            return (
              <Paper
                elevation={5}
                sx={{
                  padding: 1,
                  position: "relative",
                  border: 1,
                  borderColor: "primary.main",
                }}
              >
                <Typography variant="h6">{e.name}</Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="subtitle1">
                    Godziny: {e.hours}
                  </Typography>
                  <Typography variant="subtitle1">ECTS: {e.ects}</Typography>
                </Stack>
                <Typography variant="subtitle1">
                  opis: {e.description}
                </Typography>
                <IconButton
                  aria-label="delete"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "secondary.main",
                  }}
                  variant="contained"
                  onClick={() => {
                    setNewSubjects(
                      newSubjects.filter((x) => x.name !== e.name)
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
