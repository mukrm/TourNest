import ItineraryItem from "../ItineraryItem/ItineraryItem";
import { db, collection, getDocs, query, where } from "../../firebase";
import "../ItineraryDay/itineraryday.css";
import { useEffect, useState } from "react";

const ItineraryDay = ({ item }) => {
  const [image, setImage] = useState(null);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    async function getIteneraryItems() {
      try {
        let itItems = [];

        const itineraryItemRef = collection(db, "Itinerary_Item");

        const q = query(itineraryItemRef, where("Itinerary", "==", item.id));

        const res = await getDocs(q);

        res.forEach((doc) => {
          itItems.push({ id: doc.id, ...doc.data() });
        });

        setItineraryItems(
          itItems.sort((a, b) => (a.itemno > b.itemno ? 1 : -1))
        );
      } catch (err) {
        console.log(err);
      }
    }

    getIteneraryItems();

    /* eslint-disable */
  }, []);

  return (
    <div className="daydiv">
      <h3>Day {item.day}</h3>
      <div className="itemsdiv">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {image && (
            <img
              style={{ width: "300px", height: "300px" }}
              src={image}
              alt={item.description}
            ></img>
          )}
        </div>

        <div>
          <h3 style={{ marginLeft: "20px", marginBottom: "20px" }}>
            {item.description}
          </h3>
          <ul>
            {itineraryItems &&
              itineraryItems.map((item) => (
                <ItineraryItem
                  setImage={setImage}
                  item={item}
                  key={item.itemno}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay;
