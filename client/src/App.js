import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import { getAgences, getCountByCity } from "./redux/agences/agenceSlice";

function App() {
  const { countByCity, loading } = useSelector((state) => state.agences, shallowEqual);

  const dispatch = useDispatch();

  const cities = ['Tanger', 'Tetouan'];

  useEffect(() => {
    dispatch(getAgences());
    dispatch(getCountByCity(cities))
  }, [dispatch]);

  !loading && console.log("count", countByCity);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
