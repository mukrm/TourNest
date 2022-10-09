import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import  ItineraryItem  from "../ItineraryItem/ItineraryItem";
import { db, collection, getDocs } from "../../firebase";
import "../ItineraryDay/itineraryday.css";
import { useEffect } from "react";
const ItineraryDay = (props) => {
  const location = useLocation();
  const day = props.day;
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [tours, setTours] = useState([]);
  const [options, setOptions] = useState(location.state.options);
  useEffect(() => {
    async function getTours() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Itinerary_Item")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
              console.log(
                "Itinerary Day : " + doc.data().tour + " == " + day.id
              );
              if (doc.data().Itinerary == day.id) {
                doc.data().id = doc.id;
                t.push(doc.data());
              }
            });
          }
        );
        setTours(t);
      } catch (err) {
        console.log(err);
      }
    }
    getTours();
  }, []);
  return (
    <div className="daydiv">

      <u><h3>{day.description}</h3></u>
      <ul className="itemsdiv">
        {tours?.map((item) => (
          <ItineraryItem item={item} key={item.itemno} />
        ))}
      </ul>
    </div>
  );
};

export default ItineraryDay;
