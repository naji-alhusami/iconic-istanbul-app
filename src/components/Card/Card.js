import React, { useState } from "react";
import Signup from "../Signup/Signup";
import Login from "../../components/Login/Login";
import { CSSTransition } from "react-transition-group";
import "./Card.css"; // Import the CSS file

const Card = () => {
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center shadow-2xl">
        <CSSTransition
          in={isFlipped}
          timeout={1000}
          classNames="flip-card"
          unmountOnExit
        >
          <div
            className={`flip-container ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
          >
            <div className="front">
              <Signup />
            </div>
            <div className="back">
              <Login />
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Card;
