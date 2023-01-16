import "./list.scss"
import ClipLoader from 'react-spinners/ClipLoader';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/users/userSlice";
import { COLORS } from "../../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: COLORS.primary,
};

const List = ({ columns }) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { loading } = useSelector((state) => state[path], shallowEqual);

  return (
    <div className="list">
      <ToastContainer />
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {
          loading ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <h1 style={{ fontSize: "1rem" }}>loading...</h1>
              <ClipLoader
                color={'#ffffff'}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          )
            :
            (
              <Datatable columns={columns}/>
            )
        }
      </div>
    </div>
  )
}

export default List