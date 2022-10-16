import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HistoryCard from "../../components/history/HistoryCard";
import Navbar from "../../components/navbar/Navbar";
import { auth, getHistory } from "../../firebase";
import "./history.css";

export default function History() {
  const [data, setData] = useState(null);

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
        <h2>Your last visited tours</h2>
        {data &&
          data.map((item, index) => (
            <HistoryCard
              key={index}
              title={item.title}
              city={item.location}
              price={item.price}
              url={item.url}
            ></HistoryCard>
          ))}
      </div>
    </>
  );
}
