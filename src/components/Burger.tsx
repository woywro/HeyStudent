import React, { useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import breakpoint from "../theme/breakpoints";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  z-index: 20;
  display: none;
  @media only screen and ${breakpoint.device.xs} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  @media only screen and ${breakpoint.device.lg} {
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #ffffff;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <Nav open={open} />
    </>
  );
};

export default Burger;
