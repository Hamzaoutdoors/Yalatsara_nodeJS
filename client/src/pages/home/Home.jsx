import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Home = () => {

  return (
    <HomeContainer>
      <Header/>
      <div className="homeContainer">
      <h1 className="bigTitle">Our featured trips</h1>
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Our travel agencies</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </HomeContainer>
  );
};

export default Home;
