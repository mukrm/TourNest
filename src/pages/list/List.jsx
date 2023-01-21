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
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [tours, setTours] = useState([]);
  const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1);

  useEffect(() => {
    async function getTours() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Tours")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
              if (
                doc
                  .data()
                  .location.toLowerCase()
                  .trim()
                  .includes(destination.toLowerCase().trim())
              ) {
                let temp = {};
                temp.id = doc.id;
                temp.title = doc.data().title;
                temp.description = doc.data().description;
                temp.short_description = doc.data().short_description;
                temp.price = doc.data().price;
                temp.image = doc.data().image;
                temp.type = doc.data().type;
                temp.url = doc.data().url;
                temp.location = doc.data().location;
                temp.days = doc.data().days;
                t.push(temp);
              }
            });
          }
        );
        setTours(t);
      } catch (err) {
        console.log(err);
      }
    }

    async function getHotel() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Hotels")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
              if (
                doc
                  .data()
                  .location.toLowerCase()
                  .trim()
                  .includes(destination.toLowerCase().trim())
              ) {
                let temp = {};
                temp.id = doc.id;
                temp.title = doc.data().title;
                temp.price = doc.data().price;
                temp.image = doc.data().img;
                temp.type = doc.data().type;
                temp.url = doc.data().link;
                temp.location = doc.data().location;
                t.push(temp);
              }
            });
          }
        );
        setHotels(t);
      } catch (err) {
        console.log(err);
      }
    }

    if (location.state.type === "tour") getTours();
    else if (location.state.type === "hotel") getHotel();
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
              <input placeholder={destination} type="text" />
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
                      setMaxPrice(e.target.value > 0 ? e.target.value : 0);
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
              </div>
            </div>
          </div>
          <div className="listResult">
            {location.state.type === "tour" &&
              tours
                ?.filter((item) => {
                  if (parseInt(maxPrice) === 1) return true;

                  return (
                    item.price <= parseInt(maxPrice) && item.price > minPrice
                  );
                })
                .map((tour, index) => <SearchItem tour={tour} key={index} />)}
            {location.state.type === "hotel" &&
              hotels
                ?.filter((item) => {
                  if (parseInt(maxPrice) === 1) return true;

                  return (
                    item.price <= parseInt(maxPrice) && item.price > minPrice
                  );
                })
                .hotels.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid blue",
                        borderRadius: "10px",
                        margin: "20px 0px",
                        padding: "10px 20px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "3em",
                      }}
                      key={index}
                    >
                      <img
                        alt={item.title}
                        width={150}
                        height={150}
                        src={item.image}
                      ></img>
                      <div>
                        <h3>{item.title}</h3>
                        <h4>{item.price}</h4>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={item.url}
                          onClick={async () => {
                            await addHistory(item);
                          }}
                        >
                          Visit Original
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
