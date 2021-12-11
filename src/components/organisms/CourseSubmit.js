import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
export const CourseSubmit = ({
  setSelectedVal,
  isDisabled,
  setDisabled,
  setSent,
  handleSubmitAll,
  sent,
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        padding: 2,
        margin: 1,
        width: 1,
      }}
    >
      <Typography sx={{ margin: 1 }} variant="h5">
        Już prawie koniec!
      </Typography>
      <Typography sx={{ padding: 1 }} variant="subtitle1">
        Twój kierunek zostanie dodany do serwisu po zweryfikowaniu.
      </Typography>
      <TextField
        multiline
        fullWidth
        minRows={3}
        sx={{ margin: 1 }}
        label="wpisz swoje uwagi/prośby"
        onChange={(e) => setSelectedVal(e.target.value)}
      />
      <Button
        size="large"
        variant="contained"
        disabled={isDisabled}
        onClick={() => {
          setDisabled(true);
          setSent(true);
          handleSubmitAll();
        }}
      >
        Wyślij do zweryfikowania
      </Button>
      {sent && (
        <Button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          jeszcze raz
        </Button>
      )}
    </Paper>
  );
};
