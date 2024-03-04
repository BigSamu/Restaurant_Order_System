import React, { useState } from "react";
import { useOrderContext } from "../../contexts/OrderContext.jsx";

import { Button, Toast, ToastContainer } from "react-bootstrap";
import "./styles.css"; // Adjust the path to your CSS file accordingly

import { kitchenService } from "../../services/index.js";

const OrderButton = () => {
  const { currentOrders, setCurrentOrders } = useOrderContext();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOnClickOrderDish = async () => {
    setShowToast(true); // Show the toast
    setToastMessage("New order has been sent!"); // Set the toast message

    // Send the new order to the server
    const { order: newOrder } = await kitchenService.addNewOrder();
    setCurrentOrders([...currentOrders, newOrder]);

    // Optionally, hide the toast after a delay
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Autohide after 3 seconds
  };

  return (
    <>
      <div className="mt-3 p-2 border border-2 rounded">
        <div className="d-flex align-items-center justify-content-start">
          <p className="me-2 my-0">Order New Random Dish:</p>
          <Button variant="primary" size="sm" onClick={handleOnClickOrderDish}>
            Order
          </Button>
        </div>
      </div>
      <ToastContainer className="p-3" position="top-end">
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg="primary"
            className="m-2 toast-slide-right"
          >
            <Toast.Header>
              <strong className="me-auto">Order Status</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </>
  );
};

export default OrderButton;
