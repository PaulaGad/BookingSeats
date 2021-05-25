import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import SeatOutlook from '../Seats/SeatOutlook/SeatOutlook';
import './styles.css';
import Modal from 'antd/lib/modal/Modal';

export const freeColor = 'white';
export const reservedColor = 'darkblue';
export const selectedColor = 'darkorange';

const Legend = () => {
  const history = useHistory();
  const seats = useSelector(state => state.seats);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const legendSeats = [
    {
      id: "s00",
      cords: { 
        x: 0,
        y: 0
      },
      color: freeColor,
      text: 'Miejsce dostępne'
    },
    {
      id: "s01",
      cords: { 
        x: 0,
        y: 1
      },
      color: reservedColor,
      text: 'Miejsce zarezerwowane'
    },
    {
      id: "s02",
      cords: { 
        x: 0,
        y: 2
      },
      color: selectedColor,
      text: 'Twój wybór'
    }
  ];
  
  const anySeatSelected = seats.find(seat => seat.selected);

  const handleBookingClick = () => {
    if (anySeatSelected) {
      history.push('/summary');
    } else {
      setIsModalVisible(true);
    };
  };

  const handleModal = () => {
    setIsModalVisible(false);
  };

  const legendList = legendSeats.map(({id, cords: {x, y}, color, text}) => (
    <div className="seat-wrapper" key={id}>
      <SeatOutlook className="legend-seat" color={color} x={x} y={y}/>
      <p className="legend-text">{text}</p>
    </div>
  ));

  return (
    <div className="legend-wrapper">
      <div className="legend-seats" >
        {legendList}
      </div>
        <Button className="btnBooking" onClick={handleBookingClick}>Rezerwuj</Button>
        <Modal title="Informacja" visible={isModalVisible} onOk={handleModal} onCancel={handleModal}>
        <p>Aby dokonać rezerwacji, należy wybrać min. 1 miejsce</p>
      </Modal>
    </div>
  );
};
 
export default Legend;