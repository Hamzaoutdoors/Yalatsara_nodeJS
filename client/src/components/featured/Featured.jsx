import { shallowEqual, useSelector } from "react-redux";
import FeaturedItem from "./FeaturedItem";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  z-index: 1;
`

const Featured = () => {
  // const {agences, loading} = useSelector((state) => state.agences, shallowEqual);
  const {trips, loading} = useSelector((state) => state.trips, shallowEqual);

  const featuredTrips = trips.filter((trip) => trip.featured)

  return (
    <Container>
      {
        !loading && featuredTrips.map((trip) => (
          <FeaturedItem key={trip._id} item={trip}/>
        ))
      }
    </Container>
  );
};

export default Featured;
