import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { ErrorMessage } from "@hookform/error-message";
import { generalInfoInputs } from "../../../utils/inputsData";

export const CourseInfoAdd = ({ register, errors, handleSubmit, onSubmit }) => {
  return (
    <Box
      sx={{
        padding: 1,
        margin: 1,
        width: 1,
      }}
    >
      <Typography variant="h6">informacje o kierunku</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {generalInfoInputs.map((e) => {
          return (
            <Paper
              elevation={6}
              sx={{
                padding: 1,
                margin: 1,
              }}
            >
              <Typography sx={{ marginBottom: 1 }} variant="subtitle1">
                {e.helpText}
              </Typography>
              {e.type == "input" && (
                <TextField
                  label={e.label}
                  {...register(e.element, e.validation)}
                />
              )}
              {e.type == "select" && (
                <Select
                  fullWidth
                  defaultValue={e.options[0]}
                  {...register(e.element)}
                >
                  {e.options.map((x) => {
                    return <MenuItem value={x}>{x}</MenuItem>;
                  })}
                </Select>
              )}
              <ErrorMessage
                errors={errors}
                name={e.element}
                render={({ message }) => <p>{message}</p>}
              />
            </Paper>
          );
        })}
      </form>
    </Box>
  );
};
