import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { Divider } from "@mui/material";

export const SubjectsDialog = ({ setIsOpen, isOpen, element }) => {
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const courseSubjectsFiltered = element.subjects
    .sort((a, b) => b.hours - a.hours)
    .sort((a, b) => a.year - b.year);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Przedmioty</DialogTitle>
      <DialogContent>
        {courseSubjectsFiltered.map((e) => {
          return (
            <div>
              <Divider orientation="horizontal" flexItem />
              <Typography variant="subtitle2" sx={{ width: 1 }}>
                {e.year} semestr
              </Typography>
              <Typography sx={{ width: 1 }}>
                {e.name} ({e.hours}h)
              </Typography>
              <Divider orientation="horizontal" flexItem />
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};
