import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";
import { ItemType } from "../../../types";

interface Props {
  element: ItemType;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
}

export const Recruitment = ({ setIsOpen, isOpen, element }: Props) => {
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const getToday = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    return date;
  };

  const daysBetween = (date1: number, date2: number) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / ONE_DAY);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Terminy rekrutacji</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ padding: 1 }}>
          <ol>
            {element.recruitment
              .sort((a, b) => {
                return new Date(a.to) - new Date(b.to);
              })
              .map((e) => {
                return (
                  <li>
                    <Typography sx={{ padding: 0.5 }} variant="body1">
                      {" "}
                      {e.text}{" "}
                    </Typography>
                    <Typography sx={{ padding: 0.5 }} variant="subtitle2">
                      pozostało{" "}
                      {daysBetween(new Date(getToday()), new Date(e.to))} dni
                    </Typography>
                  </li>
                );
              })}
          </ol>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
