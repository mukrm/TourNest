import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { auth,getTours } from "../../firebase";

const Header = ({ type },{user}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  user = auth.currentUser;
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    if(!destination)
      alert("Destination needed")
    else
      navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
      {user && <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Home</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Tours</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>History</span>
          </div>
        </div>
        }
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Find your dream tour, with TourNest!
            </h1>
            <p className="headerDesc">
              Find the tour you're looking for – TourNest helps you find and
              create the perfect tour for you!
            </p>
           {!user && <Link to={"/login"}> <button className="headerBtn">Sign in / Sign Up</button> </Link>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Departure?"
                  className="headerSearchInput"
                  
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
              <select
                  placeholder="Budget?"
                  className="headerSearchInput"
                >
                  <option className="headerSearchInput">
                    Select Budget
                  </option>
                  <option className="headerSearchInput">
                    Luxury
                  </option>
                  <option className="headerSearchInput">
                    Economy
                  </option>
                  <option className="headerSearchInput">
                    Low
                  </option>
                </select>
              </div>
              <div className="headerSearchItem">
              <select
                  placeholder=""
                  className="headerSearchInput"
                >
                  <option className="headerSearchInput">
                    Select Services
                  </option>
                  <option className="headerSearchInput">
                    Transport
                  </option>
                  <option className="headerSearchInput">
                    Hotel
                  </option>
                  <option className="headerSearchInput">
                    Guide
                  </option>
                </select>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
