import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItineraryDay from "../../components/ItineraryDay/ItineraryDay";
import "../Itinerary/itinerary.css";
import { getDocs, collection, db, query, where } from "../../firebase";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

export default function Itinerary() {
  const location = useLocation();
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    async function getItineraries() {
      try {
        let it = [];

        const itenerariesRef = collection(db, "Itinerary");

        const q = query(
          itenerariesRef,
          where("tour", "==", location.state.tour.id)
        );

        const res = await getDocs(q);

        res.forEach((doc) => {
          it.push({ id: doc.id, ...doc.data() });
        });

        setItineraries(it.sort((a, b) => (a.day > b.day ? 1 : -1)));
      } catch (err) {
        console.log(err);
      }
    }

    getItineraries();

    /* eslint-disable */
  }, []);

  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="div">
        <h1>Itinerary</h1>
        <div className="div">
          {itineraries &&
            itineraries.map((item) => (
              <ItineraryDay item={item} key={item.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
