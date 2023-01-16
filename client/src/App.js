import React, { useEffect } from 'react';
import "./app.css"
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Agency from './pages/agency/Agency';
import Trip from './pages/trip/Trip';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MyReservations from './pages/reservation/MyReservations';
import { getAgences } from './redux/agences/agenceSlice';
import { getTrips } from './redux/trips/tripSlice';
import { authenticateToken } from './redux/auth/authSlice';
import Navbar from './components/navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const loggedRoutes = Object.entries({
  '/login': <Login />,
  '/sign_up': <Register />,
  '/myreservations': <MyReservations />,
  '/trips': <List />,
  '/trips/:id': <Trip />,
  '/agences/:id': <Agency />,
});

const unLoggedRoutes = Object.entries({
  '/sign_up': <Register />,
  '/trips': <List />,
  '/trips/:id': <Trip />,
  '/agences/:id': <Agency />,
});

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const handleTokenAuthentication = () => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const token = (user_data) ? user_data.token : null;

    if (token) {
      dispatch(authenticateToken(user_data));
    }
  };

  useEffect(() => {
    handleTokenAuthentication();
    dispatch(getAgences());
    dispatch(getTrips());
  }, [isAuthenticated]);

  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          {
            isAuthenticated
              ? loggedRoutes.map((route) => (
                <Route key={uuidv4()} path={route[0]} element={route[1]} />
              ))
              : unLoggedRoutes.map((route) => (
                <Route key={uuidv4()} path={route[0]} element={route[1]} />
              ))}
          {
            isAuthenticated
              ? <Route exact path="/" element={<Home />} />
              : <Route path="/*" element={<Login />} />
          }
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
