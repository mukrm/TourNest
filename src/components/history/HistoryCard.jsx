import React from "react";
import "./historycard.css";

export default function HistoryCard({ title, city, price, url, timestamp }) {
  return (
    <div className="history-card-container">
      <div>
        <h3>{title}</h3>
        <p className="subtitle">{city}</p>
        <p>{price}</p>
        <div className="last-visited-time">
          <p>Last visited:</p>
          <p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
        </div>
      </div>
      <div>
        <button className="go-to-tour-buton">
          <a href={url}>Go To Original Tour</a>
        </button>
      </div>
    </div>
  );
}
