import "./itineraryitem.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const ItineraryItem = (props) => {
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(location.state.tour);
  const item = props.item;
  let img = false;
  if (item.image != "null") {
    img = true;
  }
  return (
    <div>
      <div className="itemdiv">
        <div className="div2">
          <h4>{item.title}</h4>
          <p className="p">{item.description}</p><br></br>
        </div><b className="transparent">...</b>
        <br></br>
        {img && <img className="img" src={item.image} />}
        <br></br>
        <hr></hr>
      </div>
    </div>
  );
};

export default ItineraryItem;
