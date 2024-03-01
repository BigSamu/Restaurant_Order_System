import React from "react";

import { Container, Navbar, Nav } from "react-bootstrap";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Header = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Navbar.Brand>
            <i className="fa-solid fa-utensils"></i>{" "}
            <p className="d-inline-block my-0 mx-2 align-middle">Lunch Day</p>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
