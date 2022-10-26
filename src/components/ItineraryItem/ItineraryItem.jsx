import "./itineraryitem.css";
const ItineraryItem = (props) => {
  const item = props.item;
  let img = false;
  if (item.image != "null") {
    img = true;
  }
  return (
    <li>
      <p className="p">{item.description}</p>
    </li>
  );
};

export default ItineraryItem;
