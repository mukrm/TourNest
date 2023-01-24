import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HistoryCard from "../../components/history/HistoryCard";
import Navbar from "../../components/navbar/Navbar";
import { getHistory } from "../../firebase";
import "./history.css";

export default function History() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("timestamp");

  const getData = async () => {
    try {
      const data = await getHistory();

      setData(data);

      console.log(typeof data[0].timestamp);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div id="history-page-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Your last visited tours</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              minWidth: "200px",
            }}
          >
            <p style={{ color: "gray", fontSize: "14px" }}>Sort By</p>
            <div>
              <RadioButton
                checked={selected === "timestamp"}
                group="sorted"
                onChange={(e) => setSelected("timestamp")}
                label="Timestamp"
              />
              <RadioButton
                checked={selected === "location"}
                group="sorted"
                onChange={(e) => setSelected("location")}
                label="Location"
              />
            </div>
          </div>
        </div>
        {data &&
          selected === "timestamp" &&
          data
            .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
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

        {data &&
          selected === "location" &&
          data
            .sort((a, b) => (a.location > b.location ? 1 : -1))
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

const RadioButton = ({ checked, group, label, value, onChange }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <input
        checked={checked}
        name={group}
        value={value}
        onChange={onChange}
        type="radio"
      ></input>
      <p>{label}</p>
    </div>
  );
};
