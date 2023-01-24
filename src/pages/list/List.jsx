import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { db, collection, getDocs } from "../../firebase";
import { addHistory } from "../../firebase";

const List = () => {
  const location = useLocation();
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTours() {
      try {
        let tours = [];

        const res = await getDocs(collection(db, "Tours"));

        res.forEach((doc) => tours.push({ id: doc.id, ...doc.data() }));

        if (tours.length <= 0) return setError("No tours found");

        const filtered = tours.filter((item) =>
          item.location
            .toLowerCase()
            .trim()
            .includes(location.state.destination.toLowerCase().trim())
        );

        setTours(filtered);
        setFilteredResults(filtered);
      } catch (err) {
        console.log(err);
        setError("There was a problem fetching data");
      }
    }

    async function getHotel() {
      try {
        let hotels = [];

        const res = await getDocs(collection(db, "Hotels"));

        res.forEach((doc) => hotels.push({ id: doc.id, ...doc.data() }));

        if (hotels.length <= 0) return setError("No hotels found");

        const filtered = hotels.filter((item) =>
          item.location
            .toLowerCase()
            .trim()
            .includes(location.state.destination.toLowerCase().trim())
        );

        setHotels(filtered);
        setFilteredResults(filtered);
      } catch (err) {
        console.log(err);
        setError("There was a problem fetching data");
      }
    }

    if (location.state.type === "tour") getTours();
    else if (location.state.type === "hotel") getHotel();

    /* eslint-disable */
  }, []);

  function filterResults() {
    const list = location.state.type === "hotel" ? [...hotels] : [...tours];

    const filteredList = list.filter((item) => {
      var res = item.price.replace(/\D/g, "");

      if (parseInt(maxPrice) === 1) return true;

      console.log(
        parseInt(res) <= parseInt(maxPrice) &&
          parseInt(res) > parseInt(minPrice)
      );

      return (
        parseInt(res) <= parseInt(maxPrice) &&
        parseInt(res) > parseInt(minPrice)
      );
    });

    setFilteredResults(filteredList);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={location.state.destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in & Check-out Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    value={minPrice}
                    onChange={(e) => {
                      if (e.target.value.length > 5) return;
                      if (parseInt(maxPrice) <= parseInt(e.target.value))
                        return;
                      setMinPrice(e.target.value > 0 ? e.target.value : 0);
                    }}
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    value={maxPrice}
                    onChange={(e) => {
                      if (e.target.value.length > 5) return;
                      setMaxPrice(e.target.value > 0 ? e.target.value : 1);
                    }}
                    type="number"
                    className="lsOptionInput"
                  />
                </div>
                {/* <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div> */}
                <button
                  onClick={filterResults}
                  style={{
                    width: "100%",
                    background: "#0071c2",
                    borderRadius: "5px",
                    border: "none",
                    color: "white",
                    padding: "5px 10px",
                    marginTop: "10px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="listResult">
            <div style={{ fontWeight: "bold", color: "red", fontSize: "24px" }}>
              {error !== "" && <p>{error}</p>}
            </div>
            {location.state.type === "tour" &&
              tours &&
              filteredResults.map((tour, index) => (
                <SearchItem tour={tour} key={index} />
              ))}

            {location.state.type === "hotel" &&
              hotels &&
              filteredResults.map((item, index) => (
                <HotelItem item={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

const HotelItem = ({ item }) => {
  return (
    <div
      style={{
        border: "1px solid lightgray",
        borderRadius: "5px",
        margin: "20px 0px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
        gap: "20px",
      }}
    >
      <img
        alt={item.title}
        src={item.img}
        style={{
          objectFit: "cover",
          width: "200px",
          height: "200px",
        }}
      ></img>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ color: "#0071c2", fontSize: "20px " }}>{item.title}</h1>
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>
            {item.location}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <p style={{ fontSize: "24px", lineBreak: "revert" }}>{item.price}</p>
          <p style={{ fontSize: "12px", color: "gray" }}>Approximately</p>
          <button
            style={{
              backgroundColor: "#0071c2",
              color: "white",
              fontWeight: "bold",
              padding: "10px 5px",
              border: "none",
              borderRadius: "5px",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={async () => {
              await addHistory(item);
              window.open(item.link, "__blank");
            }}
          >
            Visit Original
          </button>
        </div>
      </div>
    </div>
  );
};
