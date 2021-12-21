import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { dataContext } from "../../../App";
import { useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { query, where, limit, updateDoc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
// import { useNavigate } from "react-router";
import { useUserContext } from "../../../context/userContext";
import { useLoadingContext } from "../../../context/loadingContext";
import { useChoosenContext } from "../../../context/choosenContext";

export const ShowSimilar = () => {
  // let navigate = useNavigate("");
  const { user } = useUserContext();
  const { choosen, setChoosen } = useChoosenContext();
  const { isLoading, setLoading } = useLoadingContext();
  const [similar, setSimilar] = useState([]);
  const [year, setYear] = useState(1);
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  function similarLimit() {
    if (user) {
      return limit(4);
    } else {
      return limit(2);
    }
  }

  async function search(colToSearch, field, operator, value) {
    setLoading(true);
    const array = [];
    const ref = collection(db, colToSearch);
    const q = query(ref, where(field, operator, value), similarLimit());
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    const arrayFiltered = array.filter((e) => e.id !== choosen.id);
    setSimilar(arrayFiltered);
    setLoading(false);
  }

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        borderRadius: "30px",
        padding: 2,
        height: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "column",
        width: 1,
      }}
    >
      <Typography variant="h5">Porównaj kierunek do</Typography>
      <Button
        color="secondary"
        variant="contained"
        sx={{ margin: 1 }}
        onClick={() =>
          search("Courses", "category", "array-contains-any", choosen.category)
        }
      >
        pokaż podobne kierunki
      </Button>
      {isLoading ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress sx={{ color: "secondary.main" }} />
        </Box>
      ) : (
        similar.map((e) => {
          return (
            <Accordion sx={{ width: 1 }}>
              <AccordionSummary>
                <Typography variant="subtitle1">
                  {e.name.join(" ")}, {e.university}, {e.city}
                </Typography>
              </AccordionSummary>
              <Divider orientation="horizontal" flexItem />
              <AccordionDetails>
                <Button
                  onClick={() => {
                    setChoosen(e);
                    // navigate("/element", { replace: true });
                  }}
                >
                  przejdź do kierunku
                </Button>
                <Select
                  value={year}
                  size="small"
                  defaultValue={1}
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
                <Typography>
                  {e.subjects
                    .sort((b, a) => a.hours - b.hours)
                    .filter((e) => e.year == year)
                    .map((s) => {
                      return (
                        <Typography variant="subtitle1">
                          {s.name} ({s.hours}h)
                        </Typography>
                      );
                    })}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
};
