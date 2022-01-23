import React, { useState } from "react";
import { MobileNav } from "../MobileNav";
import { StyledBurger } from "./style";

export const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <MobileNav open={open} setOpen={setOpen} />
    </>
  );
};
