import "./new.scss";
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

const New = () => {
  const [file, setFile] = useState("");
  const [details, setDetails] = useState({});
  const [img, setImg] = useState("");
  const [uploadLoading, setUploadLoading] = useState("");

  const { loading, message } = useSelector((state) => state.users, shallowEqual);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    setUploadLoading(true);

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/fonda/image/upload",
        data
      );

      setImg(uploadRes.data.url);

    } catch (err) {
      console.log(err.response.data)
    }

    setUploadLoading(false);
  
    const newUser = {
      ...details,
      img,
    }

    dispatch(addUser(newUser));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
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

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} id={input.id} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
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

export default New;
