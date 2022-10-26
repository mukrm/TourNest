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
import { auth, getTours } from "../../firebase";
import Select from "react-select";

const CustomSelect = ({ list, label, onChange }) => {
  return (
    <Select
      onChange={onChange}
      placeholder={label}
      className="custom-select"
      options={list}
    ></Select>
  );
};

const Header = ({ type }, { user }) => {
  const cities = [
    { value: "neelum", label: "Neelum" },
    { value: "kumrat", label: "Kumrat" },
    { value: "hunza", label: "Hunza" },
  ];

  const tourTypes = [
    { value: "customizedtour", label: "Customized Tour" },
    { value: "tour", label: "Tour" },
  ];

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [filter, setFilter] = useState(0);
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
    if (!destination) alert("Destination needed");
    else navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Find your dream tour, with TourNest!
            </h1>
            <p className="headerDesc">
              Find the tour you're looking for - TourNest helps you find and
              create the perfect tour for you!
            </p>
            {!user && (
              <Link to={"/login"}>
                {" "}
                <button className="headerBtn">Sign in / Sign Up</button>{" "}
              </Link>
            )}

            <div className="headerSearch">
              <CustomSelect
                onChange={(e) => {
                  setFilter(e.value);
                }}
                label={"Tour Type"}
                list={tourTypes}
              ></CustomSelect>
              {filter === 0 && (
                <>
                  <div style={{ color: "Black", width: "40%" }}>
                    <p>Select a tour type to continue</p>
                  </div>
                </>
              )}

              {filter === "tour" && (
                <>
                  <CustomSelect
                    label={"Where are you going?"}
                    list={cities}
                    onChange={(e) => {
                      setDestination(e.value);
                    }}
                  ></CustomSelect>
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
                </>
              )}
              {filter == "customizedtour" && (
                <>
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
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="headerIcon"
                    />
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
                </>
              )}

              {filter !== 0 && (
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
