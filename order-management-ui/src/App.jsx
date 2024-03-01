import React, { useState } from "react";

import { Row, Col, Button, Alert } from "react-bootstrap";
import RestaurtantMenu from "./components/Lists/RestaurtantMenu.jsx";

import Layout from "./components/Layout.jsx";

const App = () => {
  return (
    <Layout>
      <Row className="align-items-strech justify-content-start">
        <Col sm={12} md={6}>
          {" "}
          <h5 className="fw-bold mb-0">Restaurant Order System</h5>
          <p> Order a random dish</p>

          <hr/>
          <RestaurtantMenu/>
          


        </Col>
        <Col sm={12} md={6}>
          {" "}
          <h5 className="fw-bold mb-0">Order's Queue</h5>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
