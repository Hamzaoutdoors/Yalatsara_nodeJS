import "./agency.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { dayDifference } from "../../utils/helpers";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { images } from "../../constants";

const ContactsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Contact = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

const ContactIcon = styled.img`
    width: 10%;
    margin-right: 20px;
    object-fit: cover;
    background: linear-gradient(60deg, ${props => props.color} 50%, transparent 50%);
`;

const ContactLink = styled.span`
    font-size: 0.8rem;
`;

const Agency = () => {

  const location = useLocation();

  const agency = location.state;

  const {name, about, cat, cheapest, logo, city, contacts } = agency;

  return (
    <div>
      <Header type="list" />
      <div className="agencyContainer">

        <div className="agencyWrapper">
          <h1 className="agencyTitle">{name}</h1>
          <div className="agencyAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{city}</span>
          </div>
          <span className="agencyDistance">
            {cheapest}.00 DH
          </span>
          <span className="agencyPriceHighlight">
            {}
          </span>
          <div className="agencyImages">
            {/* {images?.map((photo, i) => (
              <div className={i === 3 ? 'thirdImagWrapper' : 'agencyImgWrapper'} key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={}
                  alt=""
                  className="agencyIm<FontAwesomeIcon icon="fa-brands fa-whatsapp" />"
                />
              </div>
            ))} */}
          </div>
          <div className="agencyDetails">
            <div className="agencyDetailsTexts">
              <h1 className="agencyTitle">{about}</h1>
            </div>
            <div className="agencyDetailsPrice">
              <h2>Agency information</h2>
              <ContactsContainer>
                <Contact>
                    <ContactIcon src={images.whtp} alt="" color="#25D366" />
                    <ContactLink>
                        {contacts.whatsapp}
                    </ContactLink>
                </Contact>
                <Contact>
                    <ContactIcon src={images.insta} alt="" color="#bc2a8d" />
                    <ContactLink>
                        {contacts.instagram}
                    </ContactLink>
                </Contact>
              </ContactsContainer>
            </div>
          </div> 
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Agency;
