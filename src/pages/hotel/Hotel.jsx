import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(location.state.tour);

  const navigate = useNavigate();
  function next() {
    //alert(tour.title)
    navigate("/itinerary", { state: { tour } });
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  window.scrollTo(0, 0);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={tour.image} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{tour.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{tour.location}</span>
          </div>

          <div className="hotelImages">
            <div className="hotelImgWrapper">
              <img
                onClick={() => handleOpen(tour.image)}
                src={tour.image}
                alt=""
                className="hotelImg"
              />
            </div>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{tour.title}</h1>
              <p className="hotelDesc">{tour.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {tour.days} day Tour!</h1>
              <span>{tour.short_description}</span>
              <h2>
                <b>{tour.price}</b> ({tour.days}) Days
              </h2>
              <button
                onClick={() => {
                  window.location.href = tour.url;
                }}
              >
                Visit Original Tour
              </button>
              <button onClick={next}>Itinerary</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
