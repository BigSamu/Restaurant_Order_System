import react, { useState, useEffect } from "react";

import { Row, Col, Button, Modal } from "react-bootstrap";
import "./ModalsStyles.css";

import { kitchenService, warehouseService } from "../../services/index.js";

const OrdersAndMarketHistory = () => {
  const [show, setShow] = useState(false);
  const [ordersLogs, setOrdersLogs] = useState();
  const [marketLogs, setMarketLogs] = useState();

  useEffect(() => {
    if (show) {
      getOrdersAndMarketLogs();
    }
  }, [show]);

  const handleOnClickOpenHistoryOrdersAndMarket = () => {
    setShow(true);
  };

  const getOrdersAndMarketLogs = async () => {
    try {
      const ordersLogsUnformatted = await kitchenService.getOrdersLogs();
      const ordersLogs = ordersLogsUnformatted.split("\n");
      const marketLogsUnformatted = await warehouseService.getMarketLogs();
      const marketLogs = marketLogsUnformatted.split("\n");
      setOrdersLogs(ordersLogs);
      setMarketLogs(marketLogs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleOnClickOpenHistoryOrdersAndMarket}
      >
        Orders and Market History
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Orders and Market History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Row>
            <Col className="modal-90h">
              <h5> Order Logs</h5>
              <div>
                {ordersLogs &&
                  ordersLogs.map((item, idx) => (
                    <p className="m-0" key={idx}>
                      <small>{item}</small>
                    </p>
                  ))}
              </div>
            </Col>
            <Col className="modal-90h">
              <h5> Market Logs</h5>
              <div>
                {marketLogs &&
                  marketLogs.map((item, idx) => (
                    <p className="m-0" key={idx}>
                      <small>{item}</small>
                    </p>
                  ))}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrdersAndMarketHistory;
