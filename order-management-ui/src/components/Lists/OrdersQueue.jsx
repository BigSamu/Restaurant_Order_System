import React, { useState, useEffect } from "react";
import { useOrderContext } from "../../contexts/OrderContext.jsx";

import { ListGroup, Alert } from "react-bootstrap";

import io from "socket.io-client";
import { KITCHEN_SERVICE_DOMAIN } from "../../config/index.js";

const OrdersQueue = () => {
  const { currentOrders, setCurrentOrders } = useOrderContext();
  const [ioKitchen] = useState(() =>
    io(`${KITCHEN_SERVICE_DOMAIN}`, {
      path: "/socket.io/kitchen/",
    })
  );

  useEffect(() => {
    ioKitchen.on("order_ready", (orderConfirmed) => {
      updateOrders(orderConfirmed);
    });

    return () => {
      ioKitchen.off("order_ready");
    };
  }, []);

  const updateOrders = (orderConfirmed) => {
    // Immediately update the order to reflect its ready state
    setCurrentOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.orderId === orderConfirmed.orderId
          ? { ...order, ...orderConfirmed }
          : order
      )
    );

    // Schedule the removal of the order, ensuring we're working with the most up-to-date state
    setTimeout(() => {
      setCurrentOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order.orderId !== orderConfirmed.orderId
        )
      );
    }, 2000);
  };

  return (
    <div
      className="overflow-scroll border border-2 border-dark mt-3 px-3"
      style={{ height: "30vh" }}
    >
      <div className="my-3">
        {!currentOrders.length && (
          <Alert variant="info">
            Queue is empty. Waiting for orders to Kitchen Service...
          </Alert>
        )}
        <ListGroup as="ul">
          {currentOrders &&
            currentOrders.map((item, id) => (
              <ListGroup.Item
                key={id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="me-auto">
                  <span className="fw-bold">{`Order #${item.orderId}:`} </span>
                  <span> {item.name}</span>
                </div>
                <div
                  className={`badge ${
                    item.status !== "ready" ? "bg-warning" : "bg-success"
                  } rounded-pill`}
                >
                  {item.status}
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default OrdersQueue;
