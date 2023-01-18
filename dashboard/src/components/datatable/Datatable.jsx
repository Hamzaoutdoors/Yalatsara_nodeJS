import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { deleteUser } from "../../redux/users/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteAgency } from "../../redux/agences/agenceSlice";
import { deleteTrip, removeUnexistingTrips } from "../../redux/trips/tripSlice";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { cancelReservation, removeUnexistingReservations } from "../../redux/reservations/reservationsSlice";

const Datatable = ({ columns }) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data } = useSelector((state) => state[path], shallowEqual);

  console.log(data[0])
  const [item, setItem] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchIt = () => {
    switch (path) {
      case "users":
        setItem("User");
        break;
      case "agences":
        setItem("Agency");
        break;
      case "trips":
        setItem("Trip");
        break;
      case "reservations":
        setItem("Reservation");
        break;
      default:
        break;
    };
  };

  useEffect(() => {
    switchIt();
  }, [path]);

  const handleDelete = (id) => {
    switch (path) {
      case "users":
        dispatch(deleteUser(id));
        break;
      case "agences":
        dispatch(deleteAgency(id));
        dispatch(removeUnexistingTrips(id))
        break;
      case "trips":
        dispatch(deleteTrip(id));
        dispatch(removeUnexistingReservations(id));
        break;
      case "reservations":
        dispatch(cancelReservation(id));
        break;
      default:
        break;
    }

    try {
      toast.success(`${item} has been removed!`, {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.error(error);
    }
  };


  const dataWithoutAdmin = data.filter((user) => !user.isAdmin);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => { navigate(`/${path}/test`, { state: params.row }) }}>View</div>
            <div
              className="deleteButton"
              onClick={(id) => handleDelete(params.row._id)}
            >
              Remove
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {item}
        <Link to={`/${path}/new`} className="link">
          Add New {item}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={item === "User" ? dataWithoutAdmin : data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
