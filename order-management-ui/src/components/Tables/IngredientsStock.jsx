import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { kitchenService } from "../../services/index.js";
import io from "socket.io-client";
import { KITCHEN_SERVICE_DOMAIN, WAREHOUSE_SERVICE_DOMAIN } from "../../config/index.js";

const IngredientsStock = () => {
  const [ingredients, setIngredients] = useState([]);
  // States to track connection readiness
  const [isKitchenConnected, setIsKitchenConnected] = useState(false);
  const [isWarehouseConnected, setIsWarehouseConnected] = useState(false);

  const [ioKitchen] = useState(() =>
    io(`${KITCHEN_SERVICE_DOMAIN}`, {
      path: "/socket.io/kitchen/",
    })
  );

  const [ioWarehouse] = useState(() =>
    io(`${WAREHOUSE_SERVICE_DOMAIN}`, {
      path: "/socket.io/warehouse/",
    })
  );

  useEffect(() => {
    // Set up kitchen connection listeners
    ioKitchen.on("connect", () => {
      console.log("Connected to kitchen.");
      setIsKitchenConnected(true); // Set kitchen connection as ready
    });
    ioKitchen.on("disconnect", () => {
      setIsKitchenConnected(false);
    });

    // Set up warehouse connection listeners
    ioWarehouse.on("connect", () => {
      console.log("Connected to warehouse.");
      setIsWarehouseConnected(true); // Set warehouse connection as ready
    });
    ioWarehouse.on("disconnect", () => {
      setIsWarehouseConnected(false);
    });

    // Socket event listeners
    ioKitchen.on("ingredients_consumed", updateIngredients);
    ioWarehouse.on("ingredients_purchased", updateIngredients);
    ioWarehouse.on("ingredients_stock_reset", updateIngredients);

    return () => {
      ioKitchen.off("connect").off("disconnect").off("ingredients_consumed");
      ioWarehouse.off("connect").off("disconnect").off("ingredients_purchased").off("ingredients_stock_reset");
    };
  }, [ioKitchen, ioWarehouse]);

  useEffect(() => {
    // Ensure both connections are ready before fetching ingredients
    if (isKitchenConnected && isWarehouseConnected) {
      getAllIngredients();
    }
  }, [isKitchenConnected, isWarehouseConnected]); // Depend on the readiness states

  const getAllIngredients = async () => {
    try {
      const menuAvailable = await kitchenService.getAllIngredients();
      setIngredients(menuAvailable);
    } catch (error) {
      console.error(error);
    }
  };

  const updateIngredients = async (updatedIngredientsList) => {
    setIngredients(updatedIngredientsList);
  };

  return (
    <div>
      <h5 className="fw-bold">Ingredients Stock</h5>
      <Table striped bordered size="sm" style={{ borderColor: "black" }} className="mt-3">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.available}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default IngredientsStock;
