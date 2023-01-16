import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { getAllUsers } from "./redux/users/userSlice";
import { getAgences } from "./redux/agences/agenceSlice";
import { getTrips } from "./redux/trips/tripSlice";
import { agencyColumn, ReservationColumn, tripColumn, userColumns } from "./datatablesource";
import { authenticateToken } from "./redux/auth/authSlice";
import NewAgency from "./pages/newAgency/NewAgency";
import NewTrip from "./pages/newTrip/NewTrip";
import { getAllReservations } from "./redux/reservations/reservationsSlice";
/* import NewReservation from "./pages/newreservation/NewReservation";
 */

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const handleTokenAuthentication = () => {
    const admin_data = JSON.parse(localStorage.getItem('admin_data'));
    const token = (admin_data) ? admin_data.token : null;

    if (token) {
      dispatch(authenticateToken(admin_data));
    }
  };

  useEffect(() => {
    handleTokenAuthentication();
    if (isAuthenticated) {
      dispatch(getAllUsers());
      dispatch(getAgences());
      dispatch(getTrips());
      dispatch(getAllReservations());
    }
  }, [isAuthenticated])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          {isAuthenticated && <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List columns={userColumns} />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New />}
              />
            </Route>
            <Route path="agences">
              <Route index element={<List columns={agencyColumn} />} />
              <Route path=":agencyId" element={<Single />} />
              <Route
                path="new"
                element={<NewAgency />}
              />
            </Route>
            <Route path="trips">
              <Route index element={<List columns={tripColumn} />} />
              <Route path=":tripId" element={<Single />} />
              <Route
                path="new"
                element={<NewTrip />}
              />
            </Route>
            <Route path="reservations">
              <Route index element={<List columns={ReservationColumn} />} />
              <Route path=":reservationId" element={<Single />} />
             {/*  <Route
                path="new"
                element={<NewReservation />}
              /> */}
            </Route>
          </Route>
          }
          {
            isAuthenticated
              ? <Route exact path="/" element={<Home />} />
              : <Route path="/*" element={<Login />} />
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
