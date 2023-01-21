import React, { useState } from "react";
import Select from "react-select";
import styles from "./searchbar.module.css";
import {
  faBuilding,
  faSuitcaseRolling,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyCalender } from "../calender/MyCalender";
import { useNavigate } from "react-router-dom";

export const SearchBarMain = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(
    selectionRange[0]["startDate"].toLocaleDateString()
  );
  const [end, setEnd] = useState(
    selectionRange[0]["startDate"].toLocaleDateString()
  );
  const [location, setLocation] = useState("");

  const changeTab = (num) => {
    setActive(num);
  };

  const cities = [
    { value: "islamabad", label: "Islamabad" },
    { value: "neelum", label: "Neelum" },
    { value: "kumrat", label: "Kumrat" },
    { value: "hunza", label: "Hunza" },
    { value: "karachi", label: "Karachi" },
  ];

  const handleSelect = (date) => {
    setSelectionRange([date.selection]);
    setStart(date.selection["startDate"].toLocaleDateString());
    setEnd(date.selection["endDate"].toLocaleDateString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let type;

    if (active === 0) type = "tour";
    else if (active === 1) type = "hotel";

    if (location)
      navigate("/hotels", {
        state: {
          destination: location,
          date: selectionRange,
          options: {},
          type: type,
        },
      });
    else alert("Destination needed");
  };

  return (
    <div id={`${styles.background}`}>
      {show && (
        <div onClick={() => setShow(false)} id={`${styles.closeCalendarBg}`} />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <TabArea active={active} changeTab={changeTab} />
        <p className={styles.labelText}>Tour/Location</p>
        <div className={styles.formContainer}>
          <CustomSelect
            list={cities}
            label="Islamabad"
            onChange={(e) => {
              setLocation(e.value);
            }}
          />
          {active === 1 && (
            <DateRangePicker
              show={show}
              setShow={setShow}
              start={start}
              end={end}
              selectionRange={selectionRange}
              handleSelect={handleSelect}
            />
          )}
        </div>
        <SearchButton />
      </form>
    </div>
  );
};

const CustomSelect = ({ list, label, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        width: "100%",
      }}
    >
      <Select
        onChange={onChange}
        placeholder={label}
        className={styles.input}
        options={list}
      ></Select>
    </div>
  );
};

const SearchButton = ({}) => {
  return (
    <button className={styles.searchButton} type="submit">
      Search
    </button>
  );
};

const TabArea = ({ active, changeTab }) => {
  return (
    <div id={styles.tabArea}>
      <Tab
        active={active === 0}
        onClick={() => {
          changeTab(0);
        }}
      >
        <p className={styles.tabText}>
          <FontAwesomeIcon icon={faSuitcaseRolling} />
          Tours
        </p>
      </Tab>
      <Tab
        active={active === 1}
        onClick={() => {
          changeTab(1);
        }}
      >
        <p className={styles.tabText}>
          <FontAwesomeIcon icon={faBuilding} />
          Hotels
        </p>
      </Tab>
    </div>
  );
};

const Tab = ({ children, onClick, active }) => {
  return (
    <a className={`${active && styles.active} ${styles.tab}`} onClick={onClick}>
      {children}
    </a>
  );
};

const DateRangePicker = ({
  show,
  setShow,
  start,
  end,
  handleSelect,
  selectionRange,
}) => {
  return (
    <div className={styles.dateRangeContainer}>
      <div
        onClick={() => {
          setShow((state) => !state);
        }}
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className={`${styles.dateInput} `}>
          <div>
            <p>Start Date</p>
            <p>{start !== null ? start : "Start Date"}</p>
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={`${styles.dateInput} }`}>
          <div>
            <p>End Date</p>
            <p>{end !== null ? end : "End Date"}</p>
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {show && (
        <div className={styles.calenderContainer}>
          <MyCalender
            minDate={new Date()}
            handleSelect={handleSelect}
            selectionRange={selectionRange}
          />
        </div>
      )}
    </div>
  );
};
