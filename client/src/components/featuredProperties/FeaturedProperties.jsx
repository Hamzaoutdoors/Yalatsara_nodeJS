import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import "./featuredProperties.css";
import FeaturedPropertiesItem from "./FeaturedPropertiesItem";

const FeaturedProperties = () => {
  const {agences, loading} = useSelector((state) => state.agences, shallowEqual);

  return (
    <div className="fp">
    {
      !loading && agences.map((item) => (
        <FeaturedPropertiesItem key={item._id} item={item}/>
      ))
    }
    </div>
  );
};

export default FeaturedProperties;
