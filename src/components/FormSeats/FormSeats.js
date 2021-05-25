import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, Form, InputNumber } from 'antd';

import { selectSeat } from '../../actions/seats';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';

const FormSeats = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const seats = useSelector(state => state.seats);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [seatsTogether, setSeatsTogether] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const numberOfavailableSeats = seats ? seats.filter(seat => seat.reserved === false).length : 99;
  const seatsUnreserved = seats.filter(seat => seat.reserved === false);

  const handleChange = () => setSeatsTogether(prevChecked => !prevChecked);

  const handleClick = () => {
    if (numberOfSeats > 0 && numberOfSeats <= 5 ) {
      handleSeatsTogether();
      history.push('/seats');
    } else if (numberOfSeats > 5 && seatsTogether) {
      setIsModalVisible(true);
    } else if (numberOfSeats > 5 && !seatsTogether) {
      handleSeparately();
    }
  };

  const handleSeparately = () => {
    handleSeatsSeparately();
    history.push('/seats');
    if (isModalVisible) setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false)
  };

  const handleSeatsTogether = () => { 
    let n = 0;
    for (let i = 0; i < numberOfavailableSeats; i++) {
        const seat = seats[i];
        if (seat) {
          if (seat.reserved) {
            n = 0;
          } else if (!seat.reserved) {
            const thisSeatY = seat.cords.y;
            const nextSeatY = seats[i+1].cords.y;
            n += 1;
            if (n < numberOfSeats && nextSeatY - thisSeatY !== 1) {
              n = 0;
            }
            if (n === numberOfSeats) {
              for (let j = 0; j < numberOfSeats; j++) {
                const numberId = i - j;
                const seatSeleted = seats[numberId]
                dispatch(selectSeat(seatSeleted.id))
              }
              return;
            } 
          }
        } else n = 0;
      };
    };

  const handleSeatsSeparately = async () => { 
    for (let i = 0; i < numberOfSeats; i++) {
      const seat = seatsUnreserved[i];
      if (seat) {
        dispatch(selectSeat(seat.id));
      };
    };
  };

  const validateMessages = {
    required: 'To pole jest wymagane',
    types: {
      number: 'Liczba miejsc musi być liczbą',
    },
    number: {
      range: `Liczba miejsc musi być w przedziale od 1 do ${numberOfavailableSeats}`,
    },
  };

  return (
    <>
      <Form
        className="form-wrapper"
        // onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={{
          seatsTogether: true,
        }}
      >
        <Form.Item
          onChange={e => setNumberOfSeats(Number(e.target.value))}
          label="Liczba miejsc"
          name="numberOfSeats"
          rules={[
            {
              required: true,
              type: 'number',
              min: 1,
              max: 100,
            },
          ]}
        >
          <InputNumber
            autoFocus
            min={1}
            max={numberOfavailableSeats}
            onChange={setNumberOfSeats}
            value={numberOfSeats}
          />
        </Form.Item>
        <Form.Item name="seatsTogether">
          <Checkbox checked={seatsTogether} onChange={handleChange}>Czy miejsca mają być obok siebie?</Checkbox>
        </Form.Item>
        <Button onClick={handleClick}>Wybierz miejsca</Button>
      </Form>
      <Modal title="Informacja" visible={isModalVisible} onOk={handleSeparately} onCancel={handleCancelModal}>
        <p>Maksymalna liczba miejsc dostępnych przy sobie to 5.</p>
        <p>Miejsca będą rozdzielone.</p>
      </Modal>
    </>
  );  
};
 
export default FormSeats;
