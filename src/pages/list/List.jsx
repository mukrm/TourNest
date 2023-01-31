import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { db, collection, getDocs } from "../../firebase";
import { addHistory } from "../../firebase";

const List = () => {
  const location = useLocation();
  const [date, setDate] = useState(location.state.date);
  const [place, setPlace] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  async function getData() {
    try {
      setError("");

      if (place.length <= 0) return setError("Search is empty");

      let data = [];

      let collectionName;

      if (location.state.type === "tour") collectionName = "Tours";
      else if (location.state.type === "hotel") collectionName = "Hotels";
      else return;

      const res = await getDocs(collection(db, collectionName));

      res.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));

      const filteredByPlace = data.filter((item) =>
        item.location.toLowerCase().trim().includes(place.toLowerCase().trim())
      );

      const filteredByPrice = filteredByPlace.filter((item) => {
        let res = item.price.replace(/\D/g, "");

        if (parseInt(maxPrice) === 1 && parseInt(minPrice) === 0) return true;

        return (
          parseInt(res) <= parseInt(maxPrice) &&
          parseInt(res) > parseInt(minPrice)
        );
      });

      if (filteredByPrice.length <= 0)
        return setError(`No ${collectionName} Found`);

      setData(filteredByPrice);
    } catch (err) {
      console.log(err);
      setError("There was a problem fetching data");
    }
  }

  useEffect(() => {
    getData();

    /* eslint-disable */
  }, []);

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
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder={location.state.destination}
                type="text"
              />
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
                    style={{ width: "80px", padding: "2px 1px" }}
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
                    style={{ width: "80px", padding: "2px 1px" }}
                    value={maxPrice}
                    onChange={(e) => {
                      if (e.target.value.length > 5) return;
                      setMaxPrice(e.target.value > 0 ? e.target.value : 1);
                    }}
                    type="number"
                    className="lsOptionInput"
                  />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await getData();
                  }}
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

            {data &&
              data.map((item) => {
                if (location.state.type === "tour")
                  return <SearchItem tour={item} key={item.id} />;
                else if (location.state.type === "hotel")
                  return <HotelItem item={item} key={item.id} />;
                else return <></>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

const HotelItem = ({ item }) => {
  const router = useNavigate();

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
              router(`/hotel/${item.id}`);
            }}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};
