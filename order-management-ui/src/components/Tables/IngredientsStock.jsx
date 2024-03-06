import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";

import { kitchenService } from "../../services/index.js";
import io from "socket.io-client";
import { RESTAURANT_ORDER_SYSTEM_DOMAIN } from "../../config/index.js";

const IngredientsStock = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ioKitchen] = useState(() =>
    io(`${RESTAURANT_ORDER_SYSTEM_DOMAIN}/kitchen`)
  );

  const [ioWarehouse] = useState(() => io(`http://localhost:8081/warehouse`));

  useEffect(() => {
    getAllIngredients();
    ioKitchen.on("ingredients_consumed", (updatedIngredientsList) => {
      updateIngredients(updatedIngredientsList);
    });
    ioWarehouse.on("ingredients_purchased", (updatedIngredientsList) => {
      updateIngredients(updatedIngredientsList);
    });

    return () => {
      ioKitchen.off("ingredients_consumed");
      ioWarehouse.off("ingredients_purchased");
    };
  }, []);

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
      <Table
        striped
        bordered
        size="sm"
        style={{ borderColor: "black" }}
        className="mt-3"
      >
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
