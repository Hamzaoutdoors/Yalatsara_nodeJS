import { addZeroes } from "../../utils/helpers";
import "./featuredProperties.css";

const FeaturedPropertiesItem = ({item}) => {

    const {name, city, cheapest, rating, logo} = item;

  return (
      <div className="fpItem">
        <img
          src={logo}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{name}</span>
        <span className="fpCity">{city}</span>
        <span className="fpPrice">Yalatsara starting from ${cheapest}</span>
        <div className="fpRating">
          <button>{addZeroes(rating)}</button>
          <span>Excellent</span>
        </div>
      </div>
  );
};

export default FeaturedPropertiesItem;
