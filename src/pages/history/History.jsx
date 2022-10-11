import React from "react";
import HistoryCard from "../../components/history/HistoryCard";
import Navbar from "../../components/navbar/Navbar";
import "./history.css";

export default function History() {
  const data = [
    {
      title: "7 Day Group Tour",
      city: "Kalam",
      rating: "8.9",
    },
    {
      title: "3 Day Trip to Murree",
      city: "Murree",
      rating: "8.5",
    },
    {
      title: "Exploring Hunza: 7 Day Trip",
      city: "Hunza",
      rating: "8.8",
    },
  ];
  return (
    <>
      <Navbar />
      <div id="history-page-container">
        <h2>Your last visited tours</h2>
        {data.map((item) => (
          <HistoryCard
            title={item.title}
            city={item.city}
            rating={item.rating}
          ></HistoryCard>
        ))}
      </div>
    </>
  );
}
