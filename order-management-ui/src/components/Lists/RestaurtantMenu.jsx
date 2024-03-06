import React, { useState, useEffect } from "react";

import { ListGroup } from "react-bootstrap";
import { kitchenService } from "../../services/index.js";

const RestaurtantMenu = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      const menuAvailable = await kitchenService.getAllRecipes();
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
                  <div>{item.description}</div>
                  <small className="fw-light fst-italic">
                    <u>Ingredients:</u>{" "}
                    {item.ingredients.map((ingredient, index) => (
                      <span key={index}>
                        {ingredient.name} ({ingredient.quantity}){" "}
                      </span>
                    ))}
                  </small>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default RestaurtantMenu;
