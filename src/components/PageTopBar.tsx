import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
export const PageTopBar = ({ content }) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        color: "white",
        backgroundColor: "primary.main",
        margin: matches ? 3 : 0,
        borderRadius: matches && "20px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        width: matches ? "0.6" : 1,
      }}
    >
      {content}
    </Box>
  );
};
