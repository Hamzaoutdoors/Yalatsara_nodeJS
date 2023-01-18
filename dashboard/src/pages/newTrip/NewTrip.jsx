import "./newtrip.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { TripInputs } from "../../formSource";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addTrip } from "../../redux/trips/tripSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { COLORS } from "../../constants";

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: COLORS.gray,
};

const NewTrip = () => {
    const { data } = useSelector(state => state.agences, shallowEqual);
    const { loading } = useSelector(state => state.trips, shallowEqual);

    const [files, setFiles] = useState("");
    const [details, setDetails] = useState({});
    const [agency, setAgency] = useState(data[0]._id || "");
    const [featured, setFeatured] = useState(false);
    const [upLoading, setUpLoading] = useState(false);


/*     useEffect(() => {
        console.log(details)
    }, [details]) */

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleChangeAgency = event => {
        setAgency(event.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setUpLoading(true);
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");

                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/fonda/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newTrip = {
                ...details,
                agence: agency,
                featured,
                images: list,
            }
            dispatch(addTrip(newTrip));
            setUpLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Trip</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                files[0]
                                    ? URL.createObjectURL(files[0])
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
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {TripInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleChange} />
                                </div>
                            ))}
                            <div className="formInput">
                                    <label>Details</label>
                                    <textarea placeholder="add more details" id="details" onChange={handleChange} />
                                </div>
                            <div className="formInput">
                                <label>Featured</label>
                                <select type="checkbox" onChange={(ev) => setFeatured(ev.target.value)}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectAgency">
                                <label>Choose an agency</label>
                                <select onChange={handleChangeAgency}>
                                    {data.map((agency) =>
                                        <option key={agency._id} value={agency._id}>{agency.name}</option>
                                    )};
                                </select>
                            </div>
                            <button type="submit" disabled={upLoading}>
                                {
                                    loading || upLoading
                                        ?
                                        (
                                            <div className="uploading">
                                              <span className="uploadingText">uploading</span>
                                                <ClipLoader
                                                    color={'#ffffff'}
                                                    loading={upLoading}
                                                    cssOverride={override}
                                                    size={20}
                                                    aria-label='Loading Spinner'
                                                    data-testid='loader'
                                                />
                                            </div>
                                        )
                                        :
                                        'Send'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTrip;
