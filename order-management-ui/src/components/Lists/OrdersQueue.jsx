import React, { useState, useEffect } from "react";
import { useOrderContext } from "../../contexts/OrderContext.jsx";
import { RESTAURANT_ORDER_SYSTEM_DOMAIN } from "../../config/index.js";

import ListGroup from "react-bootstrap/ListGroup";

import io from "socket.io-client";

const OrdersQueue = () => {
  const { currentOrders, setCurrentOrders } = useOrderContext();
  const [socket] = useState(() => io(RESTAURANT_ORDER_SYSTEM_DOMAIN));

  useEffect(() => {
    socket.on("order_ready", (orderConfirmed) => {
      updateOrders(orderConfirmed);
    });

    return () => {
      socket.off("order_ready");
    };
  }, []);

  const updateOrders = (orderConfirmed) => {
    setCurrentOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.orderId === orderConfirmed.orderId
          ? { ...order, ...orderConfirmed }
          : order
      )
    );

    setTimeout(() => {
      updateOrdersStepTwo(orderConfirmed);
    }, 2000); // Adjust the delay here as needed, 1000 ms = 1 second
  };

  const updateOrdersStepTwo = (orderConfirmed) => {
    setCurrentOrders((currentOrders) =>
      currentOrders.filter((order) => order.orderId !== orderConfirmed.orderId)
    );
  };

  return (
    <div>
      <div className="my-3">
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
