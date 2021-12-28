import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface Props {
  title: string;
  content: any;
}

export const ElementCard = ({ title, content }: Props) => {
  return (
    <Paper
      sx={{
        padding: 2,
        width: 1,
        height: 1,
        borderRadius: "30px",
      }}
      elevation={6}
    >
      <Paper
        sx={{
          width: 1,
          marginBottom: 1,
          padding: 1,
          backgroundColor: "primary.main",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 400, color: "white" }}>
          {title}
        </Typography>
      </Paper>
      {content}
    </Paper>
  );
};