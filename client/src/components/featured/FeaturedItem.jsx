import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  z-index: 1;  
`

const Featured = styled.div`
  position: relative;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  height: 250px;
  flex: 1;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
& {
  position: relative; 
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
}

  &:before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.4);
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`

const FeaturedItem = ({item}) => {

    const { title, destination, price, details, _id, featured, agence, images } = item;
    const navigate = useNavigate();
  
    const handleCardClick = () => {
      navigate(`/trips/${_id}`, {state: item});
    };

  return (
    <Container>
      <Featured onClick={handleCardClick}>
        <ImageContainer
          src={images[0]}
        />
        <TitleContainer>
          <h1>{destination}</h1>
          <h3>{title.split(" ").slice(0, 3).join(" ")}</h3>
        </TitleContainer>
      </Featured>
    </Container>
  );
};

export default FeaturedItem;
