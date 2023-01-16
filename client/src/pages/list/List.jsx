import './list.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import SearchItem from '../../components/searchItem/SearchItem';
import { searchTripsByQuery } from '../../redux/trips/tripSlice';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'blue',
};

const List = () => {
  const { searchedTrips, loading } = useSelector((state) => state.trips, shallowEqual);
  
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(999);

  const dispatch = useDispatch();

  const onClickedSearch = () => {
    dispatch(searchTripsByQuery({destination, min, max}));
  };

  useEffect(() => {
   onClickedSearch()
  }, [min, max, destination])
  

  return (
    <div>
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input placeholder={destination} type='text' onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' onChange={(e) => setMax(e.target.value)}/>
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.adult}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    placeholder={options.children}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>trip</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.trip}
                  />
                </div>
              </div>
            </div>
            <button onClick={onClickedSearch}>Search</button>
          </div>
          <div className='listResult'>
            {
              loading && searchedTrips ? (
                <ClipLoader
                  color={'#ffffff'}
                  loading={loading}
                  cssOverride={override}
                  size={150}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              ) 
              :
              searchedTrips.map((trip) => (
                  <SearchItem key={trip._id} item={trip} />
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
