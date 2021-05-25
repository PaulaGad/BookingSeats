import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Legend from '../../Legend/Legend';
import SeatItemList from '../SeatItemList/SeatItemList';
import './styles.css';

const selectSeatIds = state => state.seats.map(seat => seat.id);

const SeatList = () => {
  const seatIds = useSelector(selectSeatIds, shallowEqual);

  const seatsList = seatIds.map(seatId => (
    <SeatItemList key={seatId} id={seatId} />
  ));
  
  return (
    <div className="seats-page-wrapper">
      <div className="seats-container">
        {seatsList}
      </div>
      <Legend />
    </div>
  );
};
 
export default SeatList;
