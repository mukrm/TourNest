import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { db, collection, getDocs } from "../../firebase";


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [tours, setTours] = useState([]);
  const [options, setOptions] = useState(location.state.options);
  useEffect(() => {
    async function getTours() {
      try {
        let t = [];
        const res = await getDocs(collection(db, "Tours")).then(
          (QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
              if (
                doc.data().location.toLowerCase().trim() ==
                destination.toLowerCase().trim()
              ) {
                let temp={}
                temp.id=doc.id;
                temp.title=doc.data().title;
                temp.description=doc.data().description;
                temp.short_description=doc.data().short_description;
                temp.price=doc.data().price;
                temp.image=doc.data().image;
                temp.type=doc.data().type;
                temp.url=doc.data().url;
                temp.location=doc.data().location;
                temp.days=doc.data().days;
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
    getTours();
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
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
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
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {tours?.map((tour) => (
              <SearchItem tour={tour} key={tour.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
