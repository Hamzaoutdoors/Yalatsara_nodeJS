import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getAgence } from "../../redux/agences/agenceSlice";
import { getTrip } from "../../redux/trips/tripSlice";
import { addZeroes } from "../../utils/helpers";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const { title, destination, price, details, _id, featured, agence, images } = item;
  const navigate = useNavigate();

  const handleCardButton = () => {
    navigate(`/trips/${_id}`, {state: item});
  };

  const handleAgencyButton = () => {
    navigate(`/agences/${agence._id}`, {state: agence});
  };

  return (
    <div className="searchItem">
      <img
        src={images[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{title}</h1>
        <span className="siDistance">{destination}</span>
        {featured && <span className="siTaxiOp">featured trip</span>}
        <span className="siFeatures">
          {details.split(" ").slice(0, 30).join(" ")} ...
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siLogo" onClick={handleAgencyButton}>
          <span>{agence.name}</span>
          <div className="logoContainer">
            <img
              src={agence.logo}
              alt=""
              className="agenceLogo"
            />
          </div>
        </div>
        <div className="siDetailTexts">
          {/* <span className="siPrice">{contacts.whatsapp}</span>
          <span className="siTaxOp">{contacts.instagram}</span> */}
          <button className="siCheckButton" onClick={handleCardButton}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
