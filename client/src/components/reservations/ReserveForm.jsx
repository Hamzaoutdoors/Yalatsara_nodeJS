/* eslint-disable camelcase */
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mobile } from '../../responsive';
import {bookReservation } from '../../redux/reservations/reservationsSlice';
import { COLORS } from '../../constants';

const Form = styled.form`
  position: relative;
  padding: 0.5rem;
  border-radius: 10px 0 10px 0;
  min-width: 20vw;
  min-height: 15vh;
  background-color: #ffefd5;
  text-decoration: none;
  text-align: center !important;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const Wrapper = styled.div`
  display: flex;
  ${mobile({
    flexDirection: 'column',
  })};
  `;

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type,
  id: props.id,
  name: props.name,
  value: props.value,
  min: props.min,
  max: props.max,
}))`
  border-radius: 5px;
  border: 1px solid ${COLORS.gray};
  padding: 0.5rem 0.8rem;
  width: 30%;
  `;

const Label = styled.label`
  color: black;
  font-size: 0.7rem;
  font-weight: 500;
  text-align: left;
  padding: 0.5rem;
  `;

const SubmitButton = styled.button.attrs((props) => ({
  type: props.type,
}))`
  position: absolute;
  bottom: 15px;
  border: none;
  margin: 1rem 0 0.5rem 0;
  align-self: center;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  width: 150px;
  background-color: ${COLORS.primary};
  text-decoration: none;
  text-align: center;
  color: ${COLORS.white};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${COLORS.secondary};
    background-color: ${COLORS.white};
    border: 1px solid #f6a40e;
  }
`;

const ReserveForm = () => {
  const [numOfPlaces, setNumOfPlaces] = useState(1);

  const user_data = JSON.parse(localStorage.getItem('user_data'))

  const dispatch = useDispatch();
  const redirect = useNavigate();
  const location = useLocation();
  const tripId = location.pathname.split("/")[2];


  const handleSubmit = (e) => {
    e.preventDefault();
   
    const data = {
      numOfPlaces,
      trip: tripId,
    };
    dispatch(bookReservation(data));
    redirect('/myreservations');
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Wrapper>
          <NumberContainer>
            <Label htmlFor="start">Number of place</Label>
            <Input
              type="number"
              id="number"
              name="number"
              defaultValue={numOfPlaces}
              onChange={(e) => setNumOfPlaces(e.target.value)}
              required
            />
          </NumberContainer>
        </Wrapper>
        <SubmitButton type="submit">
          BOOK NOW
        </SubmitButton>
      </Form>
    </>
  );
};

export default ReserveForm;