import React from "react";
import "../styles/Card.css";

export default function Card({
  id,
  isMatched,
  isFlipped,
  handleClick,
  name,
  image,
}) {
  if (isFlipped || isMatched) {
    return (
      <div className="card">
        <img src={image} alt={name} />
      </div>
    );
  } else {
    return (
      <div className="card" onClick={() => handleClick(id)}>
        <h1>?</h1>
      </div>
    );
  }
}
