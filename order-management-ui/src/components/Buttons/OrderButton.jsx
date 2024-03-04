import React, { useState } from "react";

import { Button, Toast, ToastContainer, Fade } from "react-bootstrap";
import './styles.css'; // Adjust the path to your CSS file accordingly

import { orderService } from "../../services/index.js";

const OrderButton = () => {
  const [toasts, setToasts] = useState([]);

  const handleOnClickOrderDish = () => {
    // Create a new toast object
    const newToast = {
      id: new Date().getTime(), // Unique ID for key prop
      message: "New order has been sent!", // Example message
    };

    // Add the new toast to the array of toasts
    setToasts([...toasts, newToast]);

    // Send the new order to the server
    orderService.addNew();
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
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
            delay={3000}
            autohide
            bg="primary"
            className="m-2 toast-slide-right"
          >
            <Toast.Header>
              <strong className="me-auto">Order Status</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};

export default OrderButton;
