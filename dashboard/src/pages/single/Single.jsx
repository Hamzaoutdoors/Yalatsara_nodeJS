import "./single.scss";
import { useLocation } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = () => {

  const location = useLocation();

  const {username, email, country, city, phone, img, isAdmin} = location.state;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{username}</h1>
                <h3 className="itemTitle">{isAdmin && 'Admin'}</h3>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+212 {phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                    {city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
