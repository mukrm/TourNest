import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ItineraryDay from "../../components/ItineraryDay/ItineraryDay";
import "../Itinerary/itinerary.css";
import { getDocs, collection, db } from "../../firebase";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

export default function Itinerary() {
  const location = useLocation();
  const [tour, setTour] = useState(location.state.tour);
  const [tours, setTours] = useState();

  console.log(tour);

  useEffect(() => {
    async function getTours() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Itinerary")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
              if (doc.data().tour == tour.id) {
                let temp = {};
                temp.id = doc.id;
                temp.title = doc.data().title;
                temp.day = doc.data().day;
                temp.description = doc.data().description;

                t.push(temp);
              }
            });
          }
        );
        console.log(t);
        setTours(t);
      } catch (err) {
        console.log(err);
      }
    }
    getTours();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="div">
        <h1>Itinerary</h1>
        <div className="div">
          {tours?.map((day) => (
            <ItineraryDay day={day} key={day.day} title={day.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
