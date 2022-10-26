import ItineraryItem from "../ItineraryItem/ItineraryItem";
import { db, collection, getDocs } from "../../firebase";
import "../ItineraryDay/itineraryday.css";
import { useEffect, useState } from "react";

const ItineraryDay = (props) => {
  const day = props.day;
  const [tours, setTours] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getTours() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Itinerary_Item")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
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
      <div>
        <h3 style={{ marginBottom: "20px" }}>{day.description}</h3>
      </div>
      <div className="itemsdiv">
        {image && (
          <img width={300} height={300} src={image} alt={day.description}></img>
        )}
        <div>
          <ul>
            {tours
              ?.sort((a, b) => (a.itemno > b.itemno ? 1 : -1))
              .map((item, index) => {
                if (!image) setImage(item.image);
                return <ItineraryItem item={item} key={item.itemno} />;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay;
