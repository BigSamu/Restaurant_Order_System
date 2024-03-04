
import { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [currentOrders, setCurrentOrders] = useState([]);

  const context = {
    currentOrders,
    setCurrentOrders,
  };

  return (
    <OrderContext.Provider value={context}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
