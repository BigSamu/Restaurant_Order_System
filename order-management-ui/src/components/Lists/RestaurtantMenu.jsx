import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { kitchenService } from "../../services/index.js";

const RestaurtantMenu = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      const menuAvailable = await kitchenService.getAllRecipes();
      console.log(menuAvailable);
      setRecipes(menuAvailable);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h5 className="fw-bold">Restaurant Menu</h5>
      <div className="my-3">
        <ListGroup as="ol" numbered>
          {recipes &&
            recipes.map((item, id) => (
              <ListGroup.Item
                key={id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.name}</div>
                  {item.description}
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default RestaurtantMenu;
