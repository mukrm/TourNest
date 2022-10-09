import "./featured.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Featured = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
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
  function search(destination){
    navigate("/hotels", { state: { destination, date, options } });
  }
  const handleClick = (event, param) => {
    setDestination(param)
    search(param)
  };
  return (
    <div className="featured">
      <div className="featuredItem"  onClick={event => handleClick(event, 'swat')}>
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Swat</h1>
          <h2>123 Tours</h2>
        </div>
      </div>
      
      <div className="featuredItem"  onClick={event => handleClick(event, 'naran')}>
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Naran</h1>
          <h2>533 tours</h2>
        </div>
      </div>
      <div className="featuredItem"  onClick={event => handleClick(event, 'skardu')}>
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Skardu</h1>
          <h2>132 Tours</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
