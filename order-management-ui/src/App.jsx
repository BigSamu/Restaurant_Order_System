import React, { useState } from "react";

import { Row, Col, Button, Alert } from "react-bootstrap";
import OrderButton from "./components/Buttons/OrderButton.jsx";
import RestaurtantMenu from "./components/Lists/RestaurtantMenu.jsx";
import OrdersQueue from "./components/Lists/OrdersQueue.jsx";

import Layout from "./components/Layout.jsx";

const App = () => {
  return (
    <Layout>
      <Row className="align-items-strech justify-content-start gx-5">
        <Col sm={12} md={6}>
          {" "}
          <h5 className="fw-bold">Restaurant Order System</h5>
          <OrderButton />
          <hr />
          <RestaurtantMenu />
        </Col>
        <Col sm={12} md={6}>
          {" "}
          <h5 className="fw-bold mb-0">Order's Queue</h5>
          <OrdersQueue />
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
