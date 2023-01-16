import "./trip.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { dayDifference } from "../../utils/helpers";
import ReserveModal from "../../components/reservations/ReservationModal";

const Trip = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state;
  
  const numDays = dayDifference(trip.dateEnd, trip.dateStart);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  console.log(trip);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? trip.images.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === trip.images.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleAgencyButton = () => {
    navigate(`/agences/${trip.agence._id}`, {state: trip.agence});
  };

  return (
    <div>
      <Header type="list" />
      <div className="tripContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={trip.images[slideNumber]} alt="" className="sliderImg" />
            </div> 
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="tripWrapper">
        <div className="siLogo" onClick={handleAgencyButton}>
          <span>{trip.agence.name}</span>
          <div className="logoContainer">
            <img
              src={trip.agence.logo}
              alt=""
              className="agenceLogo"
            />
          </div>
        </div>
          <h1 className="tripTitle">{trip.description}</h1>
          <div className="tripAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{trip.destination}</span>
          </div>
          <span className="tripDistance">
            {trip.price}.00 DH
          </span>
          <span className="tripPriceHighlight">
            Book more than place and win a reduction of 10%
          </span>
          <div className="tripImages">
            {trip.images?.map((photo, i) => (
              <div className={i === 3 ? 'thirdImagWrapper' : 'tripImgWrapper'} key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="tripImg"
                />
              </div>
            ))}
          </div>
          <div className="tripDetails">
            <div className="tripDetailsTexts">
              <h1 className="tripTitle">{trip.title}</h1>
              <p className="tripDesc">
                {trip.details}
              </p>
            </div>
            <div className="tripDetailsPrice">
              <h1>{trip.destination}</h1>
              <span>
                {trip.title}
              </span>
              <h2>
                <b>{trip.price}.00 DH</b> ({numDays} {numDays === 1 ? 'day' : 'days'})
              </h2>
              <h4>
                Per person
              </h4>
              <ReserveModal />
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div> 
    </div>
  );
};

export default Trip;
