"use client";

import React from "react";

import { Container } from "react-bootstrap";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Layout = (props) => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <Container className="flex-fill p-4" fluid="lg">
        {props.children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
