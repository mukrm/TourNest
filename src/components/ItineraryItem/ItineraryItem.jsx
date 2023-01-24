import { useEffect } from "react";
import "./itineraryitem.css";

const ItineraryItem = ({ item, setImage }) => {
  useEffect(() => {
    if (item.image !== "") setImage(item.image);

    /* eslint-disable */
  }, []);

  return (
    <li>
      <p className="p">{item.description}</p>
    </li>
  );
};

export default ItineraryItem;
