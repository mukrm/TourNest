import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HistoryCard from "../../components/history/HistoryCard";
import Navbar from "../../components/navbar/Navbar";
import { getHistory } from "../../firebase";
import "./history.css";

export default function History() {
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");

  const changeSorting = () => {
    if (sortBy === "timestamp") setSortBy("location");
    else setSortBy("timestamp");
  };

  const getData = async () => {
    try {
      const data = await getHistory();

      setData(data);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div id="history-page-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Your last visited tours</h2>
          <button onClick={changeSorting}>Sorted By: {sortBy}</button>
        </div>
        {data &&
          data
            .sort((a, b) => {
              return a[sortBy] < b[sortBy] ? 1 : -1;
            })
            .map((item, index) => (
              <HistoryCard
                key={index}
                title={item.title}
                city={item.location}
                price={item.price}
                url={item.url}
                timestamp={item.timestamp}
              ></HistoryCard>
            ))}
      </div>
    </>
  );
}
