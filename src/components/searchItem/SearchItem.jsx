import "./searchItem.css";
import { useNavigate } from "react-router-dom";
const SearchItem = ({tour}) => {
  const navigate = useNavigate();
  function next(){
    navigate("/hotels/"+tour.title, { state: { tour } });
  }

  return (
    <div className="searchItem">
      <img
        src={tour.image}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{tour.title}</h1>
        <span className="siTaxiOp">{tour.days}</span>
        <span className="siSubtitle">
          {tour.location}
        </span>
        
        <span className="siCancelOpSubtitle">
          {tour.short_description}
        </span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">{tour.price}</span>
          <span className="siTaxOp">Approximately</span>
          <button className="siCheckButton" onClick={next}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
