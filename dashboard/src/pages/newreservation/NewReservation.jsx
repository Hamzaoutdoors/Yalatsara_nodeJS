import "./newreservation.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/users/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { COLORS } from "../../constants";
import { userInputs } from "../../formSource";

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: COLORS.primary,
};

const status = [
  {
    id: "pending", value: "pending",
    id: "failed", value: "failed",
    id: "paid", value: "paid",
    id: "accepted", value: "accepted",
    id: "canceled", value: "calceled",
  }
]

const NewReservation = () => {
  const [file, setFile] = useState("");
  const [details, setDetails] = useState({})
  const [status, setStatus] = useState("featured")

  const { loading } = useSelector((state) => state.reservations, shallowEqual);

  const dispatch = useDispatch();

  const handleChangeStatus = event => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(details));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Reservation</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="selectAgency">
                <label>Change status</label>
                <select onChange={handleChangeStatus}>
                  {status.map((item) =>
                    <option key={item.id} value={item.value}>{item.value}</option>
                  )};
                </select>
              </div>
              <button type="submit" disabled={loading}>
                {
                  loading
                    ?
                    (<ClipLoader
                      color={'#ffffff'}
                      loading={loading}
                      cssOverride={override}
                      size={30}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />)
                    :
                    'send'
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReservation;
