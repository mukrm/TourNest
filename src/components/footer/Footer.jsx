import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Tours </li>
          <li className="fListItem">History</li>
          <li className="fListItem">About Us </li>
          <li className="fListItem">Signup</li>
          <li className="fListItem">Login </li>

        </ul>
        <ul className="fList">
          <li className="fListItem">Facebook </li>
          <li className="fListItem">Instagram</li>
          <li className="fListItem">Twitter</li>
          <li className="fListItem">Unpacked: Travel articles </li>
          <li className="fListItem">Seasonal and holiday deals </li>
        </ul>
        
        <ul className="fList">
          <li className="fListItem">Curtomer Service</li>
          <li className="fListItem">Partner Help</li>
          <li className="fListItem">Careers</li>

          <li className="fListItem">Terms & conditions</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 TourNest.</div>
    </div>
  );
};

export default Footer;
