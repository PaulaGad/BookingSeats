import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSeat } from '../../../actions/seats';
import SeatOutlook from '../SeatOutlook/SeatOutlook';
import { freeColor, reservedColor, selectedColor } from '../../Legend/Legend';

const selectSeatById = (state, seatId) => {
  return state.seats.find(seat => seat.id === seatId);
};


const SeatItemList = ({ id }) => {
  const dispatch = useDispatch();
  const seat = useSelector(state => selectSeatById(state, id));
  const { cords: { x, y }, reserved, selected } = seat;

  const handleSelectSeat = () => {
    dispatch(selectSeat(id));
  };
  
  return (
    <SeatOutlook
      x={x}
      y={y}
      color={reserved ? reservedColor : (selected ? selectedColor : freeColor)}
      onClick={handleSelectSeat}
    />
  );
};
 
export default SeatItemList;