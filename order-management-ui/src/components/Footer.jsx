import React from "react";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Footer = () => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <footer className="bg-light">
        <div className="container py-2">
          <p className="text-center m-0">
            <small>
              <span>© 2024 Copyright - Lunch Day by </span>
              <a href="https://bigsamu.com/" className="link-primary">
                <u>BigSamu</u>
              </a>
            </small>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
