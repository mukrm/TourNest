import React from "react";
import "./historycard.css";

export default function HistoryCard({ title, city, rating }) {
  return (
    <div className="history-card-container">
      <h3>{title}</h3>
      <p className="subtitle">{city}</p>
      <div className="fpRating">
        <button>{rating}</button>
        <span>Excellent</span>
      </div>
    </div>
  );
}
