import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";

const RestaurtantMenu = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/kitchen/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from the kitchen service")
        console.log("hello");
        setRecipes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h5 className="fw-bold">Restaurant Menu</h5>
      <div className="my-3">
        <ListGroup as="ol" numbered>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Subheading</div>
              Cras justo odio
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default RestaurtantMenu;
